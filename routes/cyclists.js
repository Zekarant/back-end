const express = require('express');
const { getCyclists, addCyclist } = require('../controllers/cyclistController');
const router = express.Router();

router.get('/', getCyclists);
router.post('/', addCyclist);

module.exports = router;