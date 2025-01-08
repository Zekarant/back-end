const User = require('../models/user');
const Cyclist = require('../models/cyclist');

const updateUserRole = async (req, res) => {
    const { userId, role } = req.body;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.role = role;
        await user.save();

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteUser = async (req, res) => {
    const { userId } = req.params;

    try {
        const user = await User.findByIdAndDelete(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const addCyclist = async (req, res) => {
    const { name, team, nationality, age, wins } = req.body;

    try {
        const cyclist = new Cyclist({ name, team, nationality, age, wins });
        await cyclist.save();

        res.status(201).json(cyclist);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateCyclist = async (req, res) => {
    const { cyclistId, name, team, nationality, age, wins } = req.body;

    try {
        const cyclist = await Cyclist.findById(cyclistId);
        if (!cyclist) {
            return res.status(404).json({ message: 'Cyclist not found' });
        }

        cyclist.name = name;
        cyclist.team = team;
        cyclist.nationality = nationality;
        cyclist.age = age;
        cyclist.wins = wins;
        await cyclist.save();

        res.status(200).json(cyclist);
    } catch (error) {
        res.status(500).json({ message: error.message });
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

module.exports = { updateUserRole, deleteUser, addCyclist, updateCyclist, deleteCyclist };