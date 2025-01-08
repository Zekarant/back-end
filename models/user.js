const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['Member', 'Admin'], default: 'Member' },
    leagues: [{ type: mongoose.Schema.Types.ObjectId, ref: 'League' }],
    points: { type: Number, default: 0 },
    created_at: { type: Date, default: Date.now },
});

const User = mongoose.model('User', userSchema);

module.exports = User;