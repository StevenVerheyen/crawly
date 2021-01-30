const express = require('express');
const router = express.Router();
const { sendContactMail } = require('../controllers/mails');

router.route('/').post(sendContactMail);

module.exports = router;
