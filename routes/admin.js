const express = require('express');
const { updateUserRole, deleteUser, addCyclist, updateCyclist, deleteCyclist } = require('../controllers/adminController');
const { auth, admin } = require('../middleware/auth');
const router = express.Router();

router.put('/user/role', auth, admin, updateUserRole);
router.delete('/user/:userId', auth, admin, deleteUser);
router.post('/cyclist', auth, admin, addCyclist);
router.put('/cyclist', auth, admin, updateCyclist);
router.delete('/cyclist/:cyclistId', auth, admin, deleteCyclist);

module.exports = router;