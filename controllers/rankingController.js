const Pronostic = require('../models/pronostic');
const User = require('../models/user');

const getRanking = async (req, res) => {
    try {
        const ranking = await Pronostic.aggregate([
            {
                $group: {
                    _id: '$user_id',
                    totalPoints: { $sum: '$points' }
                }
            },
            {
                $lookup: {
                    from: 'users',
                    localField: '_id',
                    foreignField: '_id',
                    as: 'user'
                }
            },
            {
                $unwind: '$user'
            },
            {
                $sort: { totalPoints: -1 }
            }
        ]);

        res.json(ranking);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getRanking };