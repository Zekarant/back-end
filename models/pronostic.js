const mongoose = require('mongoose');

const pronosticSchema = new mongoose.Schema({
    course_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    stageNumber: { type: Number },
    cyclist: { type: mongoose.Schema.Types.ObjectId, ref: 'Cyclist', required: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.models.Pronostic || mongoose.model('Pronostic', pronosticSchema);