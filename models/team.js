const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
    name: { type: String, required: true }
});

const Team = mongoose.model('Team', teamSchema);

module.exports = mongoose.models.Team || Team;