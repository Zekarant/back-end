const express = require('express');
const { getCourses, addCourse, updateCourse, deleteCourse } = require('../controllers/courseController');
const { auth, admin } = require('../middleware/auth');
const router = express.Router();

router.get('/', auth, getCourses);
router.post('/', auth, admin, addCourse);
router.put('/:id', auth, admin, updateCourse);
router.delete('/:id', auth, admin, deleteCourse);

module.exports = router;