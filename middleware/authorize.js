const User = require("../models/Mysql/User");

const authorize =
  (...role) =>
  async (req, res, next) => {
    const { id } = req.user;
    const user = await User.findByPk(id);

    if (!user || !role.includes(user.role)) {
      return res.status(403).json({
        success: false,
        message: "No permission!",
      });
    }

    req.user.role = user.role;

    next();
  };

module.exports = authorize;
