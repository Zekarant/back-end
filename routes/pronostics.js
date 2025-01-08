const express = require('express');
const { addPronostic, calculatePoints } = require('../controllers/pronosticController');
const { auth } = require('../middleware/auth');
const router = express.Router();

router.post('/', auth, addPronostic);
router.get('/points/:course_id/:stageNumber?', auth, calculatePoints);

module.exports = router;