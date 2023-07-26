const errorMiddleware = (err, req, res, next) => {
  const { code = 500, message } = err;
  res.status(typeof code == "number" ? code : 500).json({
    success: false,
    message,
  });
};

module.exports = errorMiddleware;
