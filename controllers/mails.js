const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');
const sendEmail = require('../utils/sendEmail');

// @desc    Sends a contact email
// @route   POST /api/mails
// @access  Public
exports.sendContactMail = asyncHandler(async (req, res, next) => {
  const { to, name, email, subject, message } = req.body;
  console.log(req.body)
  try {
    await sendEmail({
      to,
      name,
      email,
      subject,
      message,
    });
    res.status(200).json({success: true});
  } catch (err) {
    return next(new ErrorResponse('Email could not be sent', 500));
  }
});
