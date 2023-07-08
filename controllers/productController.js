const asyncMiddleware = require("../middleware/asyncMiddleware");
const Category = require("../models/Category");
const Product = require("../models/Product");
const ErrorResponse = require("../responses/errorResponse");

const addProduct = asyncMiddleware(async (req, res, next) => {
  const { name, description, price, quantity, categoryId } = req.body;
  const { id: userId } = req.user;
  await Product.create({
    name,
    description,
    price,
    quantity,
    categoryId,
    userId,
  });

  res.status(201).json({
    success: true,
    message: "Created Product successfully!",
  });
});

const getProduct = asyncMiddleware(async (req, res, next) => {
  const product = await Product.findAll({
    include: {
      model: Category,
      attributes: {
        exclude: ["userId"],
      },
    },
  });

  res.json({
    success: true,
    data: product,
  });
});

const getProductById = asyncMiddleware(async (req, res, next) => {
  const { id } = req.params;
  const product = await Product.findOne({
    where: { id },
    include: {
      model: Category,
      attributes: {
        exclude: ["userId"],
      },
    },
  });

  res.json({
    success: true,
    data: product,
  });
});

const deleteProduct = asyncMiddleware(async (req, res, next) => {
  const { id } = req.params;
  const { id: userId } = req.user;

  const afftectCount = await Product.destroy({ where: { id, userId } });

  if (!afftectCount) {
    throw new ErrorResponse(404, "Product not found!");
  }

  res.json({
    success: true,
    message: "Deleted successfully!",
  });
});

const updateProduct = asyncMiddleware(async (req, res, next) => {
  const { id: userId } = req.user;
  const { name, description, price, quantity, categoryId } = req.body;
  const { id } = req.params;

  const afftectCount = await Product.update(
    { name, description, price, quantity, categoryId },
    { where: { id, userId } }
  );

  if (!afftectCount.length) {
    throw new ErrorResponse(404, "Product not found!");
  }

  res.json({
    success: true,
    message: "Updated successfully!",
  });
});

module.exports = {
  addProduct,
  getProduct,
  getProductById,
  deleteProduct,
  updateProduct,
};
