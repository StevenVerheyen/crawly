const express = require('express');
const router = express.Router();
const { crawl, downloadPdf } = require('../controllers/website');

router.get('/crawl/download/:fileName', downloadPdf);
router.post('/crawl', crawl);

module.exports = router;
