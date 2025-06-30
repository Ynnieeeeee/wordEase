const { VNPay, ignoreLogger, VnpLocale, dateFormat } = require('vnpay');
const Subscription = require('../models/Subscription');
const User = require('../models/user');
const crypto = require('crypto');
const qs = require('qs');
const url = require('url');

const vnpay = new VNPay({
    tmnCode: 'E4I4P78F',
    secureSecret: 'COQMNUIRGZZLO4WXSI0A6HWHIFEO1CRL',
    testMode: true,
    hashAlgorithm: 'SHA512',
    loggerFn: ignoreLogger,
});

class VNPayController {
    async createrQR(req, res) {
        const user = req.session.user;
        if (!user) {
            return res.status(401).json({ error: 'Bạn cần đăng nhập để thanh toán' });
        }

        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);

        const orderInfo = req.body.orderInfo || 'Thanh toán dịch vụ';
        const amount = parseInt(req.body.amount) || 600000;

        const txnRef = `${user._id}-${Date.now()}`;

        try {
            const vnpayResponse = await vnpay.buildPaymentUrl({
                vnp_Amount: amount,
                vnp_IpAddr: req.ip || '127.0.0.1',
                vnp_TxnRef: txnRef,
                vnp_OrderInfo: orderInfo,
                vnp_OrderType: 'other',
                vnp_ReturnUrl: 'http://localhost:3000/api/check-payment-vnpay',
                vnp_Locale: VnpLocale.VN,
                vnp_CreateDate: dateFormat(new Date()),
                vnp_ExpireDate: dateFormat(tomorrow),
            });

            res.json({ url: vnpayResponse });
        } catch (error) {
            console.error('Lỗi tạo QR:', error);
            res.status(500).json({ error: 'Không thể tạo liên kết thanh toán' });
        }
    }

    async check(req, res) {
        const secureSecret = 'COQMNUIRGZZLO4WXSI0A6HWHIFEO1CRL';
        const rawQuery = url.parse(req.originalUrl).query;

        const parsedQuery = qs.parse(rawQuery, {
            decoder: (str) => str,
        });

        const secureHash = parsedQuery.vnp_SecureHash;
        delete parsedQuery.vnp_SecureHash;
        delete parsedQuery.vnp_SecureHashType;

        const sortedParams = {};
        Object.keys(parsedQuery).sort().forEach((key) => {
            sortedParams[key] = parsedQuery[key];
        });

        const signData = qs.stringify(sortedParams, {
            encode: false,
            format: 'RFC1738',
        });

        const hash = crypto
            .createHmac('sha512', secureSecret)
            .update(signData, 'utf-8')
            .digest('hex');

        console.log('signData:', signData);
        console.log('VNPay hash:', secureHash);
        console.log('Generated hash:', hash);

        if (secureHash === hash && parsedQuery.vnp_ResponseCode === '00') {
            try {
                const txnRef = parsedQuery.vnp_TxnRef;
                const [userId] = txnRef.split('-');

                // Decode orderInfo đúng cách
                const rawOrderInfo = parsedQuery.vnp_OrderInfo;
                const orderInfo = decodeURIComponent(rawOrderInfo.replace(/\+/g, ' '));
                console.log('Đơn hàng:', orderInfo);

                let plan = 'basic';
                let duration = 0;

                if (orderInfo.includes('tháng')) {
                    plan = 'monthly';
                    duration = 30;
                } else if (orderInfo.includes('năm')) {
                    plan = 'yearly';
                    duration = 365;
                }

                const startDate = new Date();
                const endDate = new Date(startDate.getTime() + duration * 24 * 60 * 60 * 1000);

                // 1. Lưu subscription mới
                const newSub = new Subscription({
                    user_id: userId,
                    plan,
                    start_date: startDate,
                    end_date: endDate,
                    active: true,
                });

                await newSub.save();

                // 2. Cập nhật user
                await User.findByIdAndUpdate(userId, { plan });

                return res.send('Thanh toán thành công!');
            } catch (err) {
                console.error('Lỗi khi lưu subscription:', err);
                return res.status(500).send('Lỗi khi lưu thông tin thanh toán');
            }
        } else {
            return res.status(400).send('Xác minh chữ ký không hợp lệ hoặc giao dịch không thành công');
        }
    }
}

module.exports = new VNPayController();
