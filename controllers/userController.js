const asyncMiddleware = require("../middleware/asyncMiddleware");
const Address = require("../models/Mysql/Address");
const User = require("../models/Mysql/User");

const updateAddress = asyncMiddleware(async (req, res, next) => {
  const { city = null, province = null, address = null, zip = null } = req.body;
  const { id } = req.user;

  await Address.update({ city, province, address, zip }, { where: { id } });
  res.status(200).json({
    success: true,
    message: "Updated address successfully!",
  });
});

const getMe = asyncMiddleware(async (req, res, next) => {
  const { id } = req.user;

  const user = await User.findOne({
    where: { id },
    attributes: {
      exclude: ["password"],
    },
    include: [Address],
  });
  res.status(200).json({
    success: true,
    data: user,
  });
});

module.exports = { updateAddress, getMe };
