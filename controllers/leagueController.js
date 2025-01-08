const League = require('../models/league');
const User = require('../models/user');

const createLeague = async (req, res) => {
    const { name, userId } = req.body;

    if (!name || !userId) {
        return res.status(400).json({ message: 'Name and userId are required' });
    }

    try {
        const league = new League({ name, members: [userId] });
        await league.save();

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.leagues.push(league._id);
        await user.save();

        res.status(201).json(league);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const joinLeague = async (req, res) => {
    const { leagueId, userId } = req.body;

    if (!leagueId || !userId) {
        return res.status(400).json({ message: 'LeagueId and userId are required' });
    }

    try {
        const league = await League.findById(leagueId);
        if (!league) {
            return res.status(404).json({ message: 'League not found' });
        }

        if (league.members.includes(userId)) {
            return res.status(400).json({ message: 'User is already a member of this league' });
        }

        league.members.push(userId);
        await league.save();

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.leagues.push(leagueId);
        await user.save();

        res.status(200).json(league);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getLeagues = async (req, res) => {
    try {
        const leagues = await League.find();
        res.status(200).json(leagues);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getLeagueById = async (req, res) => {
    const { leagueId } = req.params;

    try {
        const league = await League.findById(leagueId).populate('members');
        if (!league) {
            return res.status(404).json({ message: 'League not found' });
        }

        res.status(200).json(league);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getLeagueRanking = async (req, res) => {
    const { leagueId } = req.params;

    try {
        const league = await League.findById(leagueId).populate('members');
        if (!league) {
            return res.status(404).json({ message: 'League not found' });
        }

        // Assuming you have a ranking logic here
        const ranking = league.members.map(member => ({
            userId: member._id,
            name: member.name,
            points: member.points // Assuming you have a points field in the User model
        }));

        res.status(200).json(ranking);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { createLeague, joinLeague, getLeagues, getLeagueById, getLeagueRanking };