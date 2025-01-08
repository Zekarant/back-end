const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    leagueId: { type: mongoose.Schema.Types.ObjectId, ref: 'League', required: true },
    user: { type: String, required: true },
    text: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.models.Message || mongoose.model('Message', messageSchema);