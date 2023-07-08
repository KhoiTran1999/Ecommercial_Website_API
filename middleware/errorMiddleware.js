const errorMiddleware = (err, req, res, next) => {
    const {code = 500, message} = err;
    res.status(code).json({
        success: false,
        message
    })
}

module.exports = errorMiddleware