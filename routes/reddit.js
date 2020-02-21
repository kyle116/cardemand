const express = require('express');
const router = express.Router();
const redditCtrl = require('../controllers/reddit');

// Route: /api/reddit
// Public Routes
router.get('/getposts', redditCtrl.getposts);
router.get('/signin', redditCtrl.signin);
router.get('/psposts', redditCtrl.psPosts);

module.exports = router;