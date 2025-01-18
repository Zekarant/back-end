const mongoose = require('mongoose');

const cyclistSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    team: { type: String, required: true },
    nationality: { type: String, required: false },
    age: { type: Number, required: false },
    wins: { type: Number, required: false }
});

module.exports = mongoose.models.Cyclist || mongoose.model('Cyclist', cyclistSchema);