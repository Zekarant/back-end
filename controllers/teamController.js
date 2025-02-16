const Team = require('../models/team');

const getTeams = async (req, res) => {
    try {
        const teams = await Team.find().sort({ name: 1 });
        res.json(teams);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const addTeam = async (req, res) => {
    const { name } = req.body;
    const team = new Team({ name });

    try {
        const newTeam = await team.save();
        res.status(201).json(newTeam);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deleteTeam = async (req, res) => {
    try {
        const team = await Team.findById(req.params.id);
        if (!team) {
            return res.status(404).json({ message: 'Team not found' });
        }
        await team.remove();
        res.json({ message: 'Team deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getTeams, addTeam, deleteTeam };