const User = require('../models/user');
const Set = require('../models/Set');
const Subscription = require('../models/Subscription');


//thời gian bắt đầu
const startOf = (unit) => {
    const now = new Date();
    switch (unit) {
        case 'week': {
            const copy = new Date(now);
            copy.setDate(copy.getDate() - copy.getDay());
            copy.setHours(0, 0, 0, 0);
            return copy;
        }
        case 'month':
            return new Date(now.getFullYear(), now.getMonth(), 1);
        case 'year':
            return new Date(now.getFullYear(), 0, 1);
    }
};

const endOf = (unit) => {
    const now = new Date();
    switch (unit) {
        case 'week': {
            const copy = new Date(now);
            copy.setDate(copy.getDate() - copy.getDay() + 6);
            copy.setHours(23, 59, 59, 999);
            return copy;
        }
        case 'month':
            return new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999);
        case 'year':
            return new Date(now.getFullYear(), 11, 31, 23, 59, 59, 999);
    }
};

class DashBoardController {
    async index(req, res){
        try {
            const units = ['week', 'month', 'year'];
            const stats = {};

            for (let unit of units){
                const currentStart = startOf(unit);
                const currentEnd = endOf(unit);
                const preStart = new Date(currentStart);
                const preEnd = new Date(currentEnd);

                if(unit === 'week'){
                    preStart.setDate(preStart.getDate() - 7);
                    preEnd.setDate(preEnd.getDate() - 7);
                } else if(unit === 'month'){
                    preStart.setMonth(preStart.getMonth() - 1);
                    preEnd.setMonth(preEnd.getMonth() - 1);
                } else {
                    preStart.setFullYear(preStart.getFullYear() - 1);
                    preEnd.setFullYear(preEnd.getFullYear() - 1);
                }

                const currentLearners = await User.countDocuments({create_at: { $gte: currentStart, $lte: currentEnd}});
                const preLearners = await User.countDocuments({ create_at: { $gte: preStart, $lte: preEnd}});

                const topCreators = await Set.aggregate([
                    {$match: {createdAt: {$gte: currentStart, $lte: currentEnd}}},
                    {$group: {_id: "$user_id", count: {$sum: 1}}},
                    {$sort: {count: -1}},
                    {$limit: 5},
                    {$lookup: {from: 'users', localField: '_id', foreignField: '_id', as: 'user'}},
                    {$unwind: "$user"},
                ]);

                const upgradeUsers = await Subscription.countDocuments({start_date: {$gte: currentStart, $lte: currentEnd}});
                const totalRevenue = await Subscription.aggregate([
                    {$match: {start_date: { $gte: currentStart, $lte: currentEnd}}},
                    {
                        $group: {
                            _id: null,
                            total: {$sum: {
                                $cond: [
                                    { $eq: ["$plan", "monthly"]}, 70000,
                                    { $cond: [{$eq: ["$plan", "yearly"]}, 600000, 0]}
                                ]
                            }}
                        }
                    }
                ]);

                stats[unit] = {
                    currentLearners,
                    preLearners,
                    topCreators,
                    upgradeUsers,
                    totalRevenue: totalRevenue[0] ? totalRevenue[0].total : 0
                };
            }
            res.render('dashboard', {layout: false, stats,bhelpers: { json: (context) => JSON.stringify(context)}});
        } catch (error) {
            console.error(error);
            res.status(500).send('Server error');
        }
    }
}

module.exports = new DashBoardController();


