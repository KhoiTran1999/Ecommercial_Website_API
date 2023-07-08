const User = require("../models/User");

const authorize = (...role) => async (req, res, next) => {
    const {id} = req.user;
    const user = await User.findByPk(id);
    console.log(user.role);
    if(!user || !role.includes(user.role)) {
        return res.status(403).json({
            success: false,
            message: "No permission!"
        })
    }

    next();
}

module.exports = authorize