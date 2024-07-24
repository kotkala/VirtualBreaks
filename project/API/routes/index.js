const express = require('express');
const router = express.Router();
const musicController = require('../controllers/music');

router.get('/music', musicController.getMusicLink);
router.post('/music', musicController.updateMusicLink);

module.exports = router;
