const express = require('express');
const { register, login, getUser, getUsers } = require('../controllers/authController');
const { auth } = require('../middleware/auth');
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/user', auth, getUser);
router.get('/users', auth, getUsers);

module.exports = router;