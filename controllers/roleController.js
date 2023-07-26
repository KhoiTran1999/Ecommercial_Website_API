const asyncMiddleware = require("../middleware/asyncMiddleware");
const User = require("../models/Mysql/User");
const ErrorResponse = require("../responses/errorResponse");

const makeOwner = asyncMiddleware(async (req, res) => {
  const { userId } = req.body;

  if (req.user.id === userId) {
    throw new ErrorResponse(409, "Can not change admin's role");
  }

  const affectedCount = await User.update(
    { role: "owner" },
    { where: { id: userId } }
  );

  if (!affectedCount.length) {
    throw new ErrorResponse(404, "User not found!");
  }

  res.status(200).json({
    success: true,
    affectedCount: affectedCount[0],
  });
});

const makeCustomer = asyncMiddleware(async (req, res) => {
  const { userId } = req.body;

  if (req.user.id === userId) {
    throw new ErrorResponse(409, "Can not change admin's role");
  }

  const affectedCount = await User.update(
    { role: "customer" },
    { where: { id: userId } }
  );

  if (!affectedCount.length) {
    throw new ErrorResponse(404, "User not found!");
  }

  res.status(200).json({
    success: true,
    affectedCount: affectedCount[0],
  });
});

module.exports = { makeOwner, makeCustomer };
