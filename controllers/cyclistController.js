const Cyclist = require('../models/cyclist');

const getCyclists = async (req, res) => {
    try {
        const cyclists = await Cyclist.find().sort({ lastName: 1 });
        res.json(cyclists);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const addCyclist = async (req, res) => {
    const { firstName, lastName, team, nationality, age, wins } = req.body;
    const cyclist = new Cyclist({ firstName, lastName, team, nationality, age, wins });

    try {
        const newCyclist = await cyclist.save();
        res.status(201).json(newCyclist);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const updateCyclist = async (req, res) => {
    const { id } = req.params;
    const { firstName, lastName, team, nationality, age, wins } = req.body;

    try {
        const cyclist = await Cyclist.findById(id);
        if (!cyclist) {
            return res.status(404).json({ message: 'Cyclist not found' });
        }

        cyclist.firstName = firstName || cyclist.firstName;
        cyclist.lastName = lastName || cyclist.lastName;
        cyclist.team = team || cyclist.team;
        cyclist.nationality = nationality || cyclist.nationality;
        cyclist.age = age || cyclist.age;
        cyclist.wins = wins || cyclist.wins;

        const updatedCyclist = await cyclist.save();
        res.json(updatedCyclist);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deleteCyclist = async (req, res) => {
    const { cyclistId } = req.params;

    try {
        const cyclist = await Cyclist.findByIdAndDelete(cyclistId);
        if (!cyclist) {
            return res.status(404).json({ message: 'Cyclist not found' });
        }

        res.status(200).json({ message: 'Cyclist deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getCyclists, addCyclist, updateCyclist, deleteCyclist };