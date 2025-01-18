const Course = require('../models/course');
const User = require('../models/user');
const Pronostic = require('../models/pronostic');

const getCourses = async (req, res) => {
    try {
        const courses = await Course.find().sort({ date: 1 });
        res.json(courses);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const addCourse = async (req, res) => {
    const { name, date, type, category, participants } = req.body;
    const course = new Course({ name, date, type, category, participants });

    try {
        const newCourse = await course.save();
        res.status(201).json(newCourse);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const updateCourse = async (req, res) => {
    const { id } = req.params;
    const { name, date, type, category, participants } = req.body;

    try {
        const course = await Course.findById(id);
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }

        course.name = name || course.name;
        course.date = date || course.date;
        course.type = type || course.type;
        course.category = category || course.category;
        course.participants = participants || course.participants;

        const updatedCourse = await course.save();
        res.json(updatedCourse);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deleteCourse = async (req, res) => {
    const { id } = req.params;

    try {
        const course = await Course.findById(id);
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }

        await course.remove();
        res.json({ message: 'Course deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const calculatePoints = async (course) => {
    const pointsTable = {
        'Classique 1.1': { 1: 5, 2: 3, 3: 1 },
        'Classique 1.WT': { 1: 8, 2: 6, 3: 2 },
        'Monument': { 1: 18, 2: 12, 3: 6 },
        'Tour 2.1': { general: { 1: 9, 2: 6, 3: 3 }, stage: { 1: 3, 2: 2, 3: 1 } },
        'Tour 2.WT': { general: { 1: 15, 2: 10, 3: 5 }, stage: { 1: 5, 2: 3, 3: 1 } },
        'Grand Tour': { general: { 1: 30, 2: 20, 3: 10 }, stage: { 1: 5, 2: 3, 3: 1 } }
    };

    const pronostics = await Pronostic.find({ course_id: course._id }).populate('cyclist');
    const results = course.results; // Assuming results is an array of cyclist IDs in order of their finish

    for (const pronostic of pronostics) {
        const position = results.indexOf(pronostic.cyclist._id) + 1;
        let points = 0;
        if (position > 0 && position <= 3) {
            if (course.type === 'Tour' && pronostic.stageNumber !== undefined) {
                points = pointsTable[course.category].stage[position] || 0;
            } else if (course.type === 'Tour') {
                points = pointsTable[course.category].general[position] || 0;
            } else {
                points = pointsTable[course.category][position] || 0;
            }

            if (points > 0) {
                const user = await User.findById(pronostic.user_id);
                user.points += points;
                await user.save();
            }
        }
    }
};

module.exports = { getCourses, addCourse, updateCourse, deleteCourse };