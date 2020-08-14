const express = require('express');
const router = express.Router();
const { crawl, downloadPdf } = require('../controllers/website');

router.post('/crawl', crawl);
router.get('/crawl/download/:fileName', downloadPdf);

module.exports = router;
