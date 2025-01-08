const mongoose = require('mongoose');

const cyclistSchema = new mongoose.Schema({
    name: { type: String, required: true },
    team: { type: String, required: true },
    nationality: { type: String, required: true },
    age: { type: Number, required: true },
    wins: { type: Number, required: true }
});

module.exports = mongoose.models.Cyclist || mongoose.model('Cyclist', cyclistSchema);