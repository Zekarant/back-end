const express = require('express');
const { addMessage, getMessages } = require('../controllers/messageController');
const { auth } = require('../middleware/auth');
const router = express.Router();

router.post('/', auth, addMessage);
router.get('/:leagueId', auth, getMessages);

module.exports = router;