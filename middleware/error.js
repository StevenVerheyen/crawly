const errorHandler = (err, req, res, next) => {
  // console.log(err); // logging for devs

  let error = { ...err };
  error.message = err.message; // this is done because `message` is our own custom property
  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || 'Server Error',
  });
};

module.exports = errorHandler;
