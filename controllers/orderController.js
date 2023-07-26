const asyncMiddleware = require("../middleware/asyncMiddleware");
const Order = require("../models/Mysql/Order");
const Product = require("../models/Mysql/Product");
const User = require("../models/Mysql/User");
const Address = require("../models/Mysql/Address");
const ErrorResponse = require("../responses/errorResponse");
const Order_Product = require("../models/Mysql/OrderProduct");
const Coupon = require("../models/Mysql/Coupon");

const createOrder = asyncMiddleware(async (req, res, next) => {
  const { productList, note, couponId } = req.body;
  const { id: userId } = req.user;

  const coupon = await Coupon.findByPk(couponId);
  if (!coupon) {
    throw new ErrorResponse(404, "Coupon not found");
  }

  if (new Date(coupon.endDay) < new Date()) {
    throw new ErrorResponse(409, "Coupon is out of date");
  }

  let isValidQuantity = true;
  let message = "";
  for (const val of productList) {
    const product = await Product.findByPk(val.id);
    if (!product) {
      isValidQuantity = false;
      message = "Product not found";
      break;
    }

    if (product.dataValues.quantity - val.quantity < 0) {
      isValidQuantity = false;
      message = "Not enough amount of product in stock";
      break;
    }
  }

  if (!isValidQuantity) {
    throw new ErrorResponse(409, message);
  }

  const order = await Order.create({ note, couponId, userId });

  const orderProduct = productList.map((val) => ({
    orderId: order.id,
    productId: val.id,
    quantity: val.quantity,
  }));

  await Order_Product.bulkCreate(orderProduct);

  res.status(201).json({
    success: true,
    message: "created successfully",
  });
});

const getOrder = asyncMiddleware(async (req, res, next) => {
  const { id: userId } = req.user;
  const { role } = req.user;

  let order = [];
  if (role === "customer") {
    order = await Order.findAll({
      where: { userId },
      include: [
        Product,
        {
          model: User,
          attributes: { exclude: ["createdAt", "updatedAt", "password"] },
          include: [Address],
        },
      ],
    });
  } else if (role === "owner") {
    order = await Order.findAll({
      include: [
        Product,
        {
          model: User,
          attributes: { exclude: ["createdAt", "updatedAt", "password"] },
          include: [Address],
        },
      ],
    });
  }

  res.json({
    success: true,
    data: order,
  });
});

const getOrderById = asyncMiddleware(async (req, res, next) => {
  const { id: userId, role } = req.user;
  const { id } = req.params;

  let order = [];
  if (role === "customer") {
    order = await Order.findAll({
      where: { id, userId },
      include: [Product],
    });
  } else if (role === "owner") {
    order = await Order.findAll({
      include: [Product],
    });
  }

  res.json({
    success: true,
    data: order,
  });
});

const getOrderByStatus = asyncMiddleware(async (req, res, next) => {
  const { id: userId, role } = req.user;
  const { status } = req.body;

  let order = [];
  if (role === "customer") {
    order = await Order.findAll({
      where: { userId, status },
      include: [Product],
    });
  } else if (role === "owner") {
    order = await Order.findAll({ where: { status }, include: [Product] });
  }

  res.json({
    success: true,
    data: order,
  });
});

const deleteOrderById = asyncMiddleware(async (req, res, next) => {
  const { id } = req.params;

  const affectedCount = await Order.destroy({ where: { id } });

  await Order_Product.destroy({ where: { orderId: id } });

  if (!affectedCount) {
    res.status(404).json({
      success: false,
      message: "Not found!",
    });
  }

  res.json({
    success: true,
    message: "Deleted order successfully!",
  });
});

const cancelledOrder = asyncMiddleware(async (req, res, next) => {
  const { id: userId, role } = req.user;
  const { cancelledReason } = req.body;
  const { id } = req.params;

  const order = await Order.findByPk(id);

  if (!order) {
    throw new ErrorResponse(404, "Order not found");
  }

  if (!["pending", "approved"].includes(order.status)) {
    throw new ErrorResponse(400, "You can not cancel this order");
  }

  if (role === "customer" && order.status !== "pending") {
    throw new ErrorResponse(400, "You can not cancel this order");
  }

  if (role === "customer" && userId != order.userId) {
    throw new ErrorResponse(403, "You are not allowed to cancel this order");
  }

  if (role === "owner" && order.status === "approved") {
    const orderProduct = await Order_Product.findAll({
      where: { orderId: order.id },
    });

    orderProduct.forEach((val) => {
      Product.findByPk(val.productId).then((product) => {
        product.quantity += val.quantity;
        product.save();
      });
    });
  }

  order.status = "cancel";
  order.cancelled_at = new Date();
  order.cancelledReason = cancelledReason;
  order.cancelledBy = userId;

  await order.save();

  res.json({
    success: true,
    message: "Cancelled successfully!",
  });
});

const updateNote = asyncMiddleware(async (req, res, next) => {
  const { id: userId } = req.user;
  const { id } = req.params;
  const { note } = req.body;

  const affectedCount = await Order.update(
    { note },
    { where: { id, userId, status: "pending" } }
  );

  if (!affectedCount[0]) {
    throw new ErrorResponse(404, "Invalid Order");
  }

  res.json({
    success: true,
    message: "Updated note successfully!",
  });
});

const setOrderDone = asyncMiddleware(async (req, res, next) => {
  const { id } = req.params;

  const order = await Order.findByPk(id);

  if (!order) {
    throw new ErrorResponse(404, "Not found!");
  }

  order.cancelledReason = null;
  order.cancelled_at = null;
  order.cancelledBy = null;
  order.received_at = new Date();
  order.status = "done";
  order.save();

  res.json({
    success: true,
    message: "Updated status successfully!",
  });
});

const setOrderDelivery = asyncMiddleware(async (req, res, next) => {
  const { id } = req.params;

  const order = await Order.findByPk(id);

  if (!order) {
    throw new ErrorResponse(404, "Not found!");
  }

  order.received_at = null;
  order.cancelledReason = null;
  order.cancelled_at = null;
  order.cancelledBy = null;
  order.status = "delivery";
  order.save();

  res.json({
    success: true,
    message: "Delivery setted",
  });
});

const setOrderApproved = asyncMiddleware(async (req, res, next) => {
  const { id } = req.params;

  const order = await Order.findByPk(id);

  if (!order) {
    throw new ErrorResponse(404, "Order not found");
  }
  if (order.status === "approved") {
    throw new ErrorResponse(400, "You can not approved this order");
  }

  const orderProduct = await Order_Product.findAll({
    where: { orderId: id },
    include: [Product],
  });

  if (orderProduct.length === 0) {
    throw new ErrorResponse(404, "Not found!");
  }

  const product = [];
  const isValidQuantity = orderProduct.every((val) => {
    val.Product.quantity -= val.quantity;
    if (val.Product.quantity < 0) return false;

    product.push(val.Product);
    return true;
  });

  if (!isValidQuantity) {
    throw new ErrorResponse(409, "Not enough amount of product in stock ");
  }

  for (const val of product) {
    await Product.update(val.dataValues, { where: { id: val.id } });
  }

  order.cancelledReason = null;
  order.cancelled_at = null;
  order.cancelledBy = null;
  order.status = "approved";
  order.save();

  res.json({
    success: true,
    message: "Approved successfully",
  });
});

module.exports = {
  createOrder,
  getOrder,
  getOrderById,
  getOrderByStatus,
  cancelledOrder,
  updateNote,
  deleteOrderById,
  setOrderDone,
  setOrderDelivery,
  setOrderApproved,
};
