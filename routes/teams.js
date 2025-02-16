const express = require('express');
const { getTeams, addTeam, deleteTeam } = require('../controllers/teamController');
const router = express.Router();

router.get('/', getTeams);
router.post('/', addTeam);
router.delete('/:id', deleteTeam);

module.exports = router;