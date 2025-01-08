const Pronostic = require('../models/Pronostic');
const Course = require('../models/course');

const addPronostic = async (req, res) => {
    const { course_id, stageNumber, prediction, user_id } = req.body;

    if (!course_id || !prediction.cyclist) {
        return res.status(400).json({ message: 'Course ID and cyclist are required' });
    }

    try {
        const course = await Course.findById(course_id);
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }

        if (course.type === 'Tour' && stageNumber !== undefined) {
            const existingPronostic = await Pronostic.findOne({ course_id, user_id, stageNumber });
            if (existingPronostic) {
                return res.status(400).json({ message: 'You have already placed a pronostic for this stage.' });
            }
        } else {
            const existingPronostic = await Pronostic.findOne({ course_id, user_id });
            if (existingPronostic) {
                return res.status(400).json({ message: 'You have already placed a pronostic for this course.' });
            }
        }

        const newPronostic = new Pronostic({
            course_id,
            user_id,
            stageNumber,
            cyclist: prediction.cyclist
        });
        await newPronostic.save();
        res.status(201).json(newPronostic);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const calculatePoints = async (req, res) => {
    const { course_id, stageNumber } = req.params;

    try {
        const course = await Course.findById(course_id).populate('results');
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }

        let pronostics;
        if (course.type === 'Tour' && stageNumber !== undefined) {
            pronostics = await Pronostic.find({ course_id, stageNumber }).populate('cyclist');
        } else {
            pronostics = await Pronostic.find({ course_id }).populate('cyclist');
        }

        const results = course.results; // Assuming results is an array of cyclist IDs in order of their finish

        const pointsTable = {
            'Classique 1.1': { 1: 5, 2: 3, 3: 1 },
            'Classique 1.WT': { 1: 8, 2: 6, 3: 2 },
            'Monument': { 1: 18, 2: 12, 3: 6 },
            'Tour 2.1': { general: { 1: 9, 2: 6, 3: 3 }, stage: { 1: 3, 2: 2, 3: 1 } },
            'Tour 2.WT': { general: { 1: 15, 2: 10, 3: 5 }, stage: { 1: 5, 2: 3, 3: 1 } },
            'Grand Tour': { general: { 1: 30, 2: 20, 3: 10 }, stage: { 1: 5, 2: 3, 3: 1 } }
        };

        const points = pronostics.map(pronostic => {
            const position = results.indexOf(pronostic.cyclist._id) + 1;
            let points = 0;
            if (course.type === 'Tour' && stageNumber !== undefined) {
                points = pointsTable[course.category].stage[position] || 0;
            } else if (course.type === 'Tour') {
                points = pointsTable[course.category].general[position] || 0;
            } else {
                points = pointsTable[course.category][position] || 0;
            }
            return {
                user_id: pronostic.user_id,
                points
            };
        });

        res.status(200).json(points);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { addPronostic, calculatePoints };