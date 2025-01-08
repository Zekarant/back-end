const Cyclist = require('../models/cyclist');

const getCyclists = async (req, res) => {
    try {
        const cyclists = await Cyclist.find().sort({ name: 1 });
        res.json(cyclists);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const addCyclist = async (req, res) => {
    const { name, team } = req.body;
    const cyclist = new Cyclist({ name, team });

    try {
        const newCyclist = await cyclist.save();
        res.status(201).json(newCyclist);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = { getCyclists, addCyclist };