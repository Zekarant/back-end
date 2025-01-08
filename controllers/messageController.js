const Message = require('../models/Message');

const addMessage = async (req, res) => {
    const { leagueId, user, text } = req.body;

    if (!leagueId || !user || !text) {
        return res.status(400).json({ message: 'LeagueId, user, and text are required' });
    }

    try {
        const message = new Message({ leagueId, user, text });
        await message.save();
        res.status(201).json(message);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getMessages = async (req, res) => {
    const { leagueId } = req.params;

    try {
        const messages = await Message.find({ leagueId }).sort({ createdAt: 1 });
        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { addMessage, getMessages };