const express = require('express');
const { createLeague, joinLeague, getLeagues, getLeagueById, getLeagueRanking } = require('../controllers/leagueController');
const { auth } = require('../middleware/auth');
const router = express.Router();

router.post('/', auth, createLeague);
router.post('/join', auth, joinLeague);
router.get('/', auth, getLeagues);
router.get('/:leagueId', auth, getLeagueById);
router.get('/:leagueId/ranking', auth, getLeagueRanking);

module.exports = router;