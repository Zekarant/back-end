const mongoose = require('mongoose');

const stageSchema = new mongoose.Schema({
    stageNumber: { type: Number, required: true },
    date: { type: Date, required: true },
    results: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Cyclist' }]
});

const courseSchema = new mongoose.Schema({
    name: { type: String, required: true },
    date: { type: Date, required: true },
    type: { type: String, enum: ['Classic', 'Tour'], required: true },
    category: { type: String, enum: ['Classique 1.1', 'Classique 1.WT', 'Monument', 'Tour 2.1', 'Tour 2.WT', 'Grand Tour'], required: true },
    stages: [stageSchema],
    results: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Cyclist' }],
    isCompleted: { type: Boolean, default: false }
});


module.exports = mongoose.models.Course || mongoose.model('Course', courseSchema);