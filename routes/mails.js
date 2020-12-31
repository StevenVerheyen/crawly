const express = require('express');
const router = express.Router();
const { sendContactMail } = require('../controllers/mails');

// note: because in `server.js` we mount the api,
// nodejs will know to prefix every request with the one
// that is defined in the `.use()` method.
router.route('/').post(sendContactMail);

module.exports = router;
