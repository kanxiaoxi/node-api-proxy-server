const errorHandler = (err, req, res, next) => {
  // https://www.geeksforgeeks.org/express-js-res-headerssent-property/
  if (res.errorHandler) {
    return next(err);
  }
  res.status(500).json({
    success: false,
    error: err.message || 'Server Error',
    stack: process.env.NODE_ENV === 'production' ? undefined : err.stack,
  });
}

module.exports = errorHandler;