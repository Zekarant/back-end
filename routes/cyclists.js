const express = require('express');
const { getCyclists, addCyclist, updateCyclist, deleteCyclist } = require('../controllers/cyclistController');
const router = express.Router();

router.get('/', getCyclists);
router.post('/', addCyclist);
router.put('/:id', updateCyclist);
router.delete('/:id', deleteCyclist);

module.exports = router;