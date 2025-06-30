document.addEventListener("DOMContentLoaded", () => {
    const buyButtons = document.querySelectorAll(".buyBtn");

    buyButtons.forEach(button => {
        button.addEventListener("click", async () => {
            const amount = button.dataset.amount;
            const orderInfo = button.dataset.info;

            try {
                const response = await fetch('/api/create-qr', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        amount: amount,
                        orderInfo: orderInfo
                    })
                });

                const result = await response.json();

                if (result.url) {
                    window.location.href = result.url; 
                } else {
                    alert("Không thể tạo liên kết thanh toán.");
                }
            } catch (error) {
                console.error("Lỗi gọi API thanh toán:", error);
                alert("Có lỗi xảy ra. Vui lòng thử lại.");
            }
        });
    });
});
