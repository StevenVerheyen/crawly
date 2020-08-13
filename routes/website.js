const express = require('express');
const router = express.Router();
const { crawl } = require('../controllers/website');

router.post('/crawl', crawl);

module.exports = router;
