const asyncMiddleware = require("../middleware/asyncMiddleware");
const Category = require("../models/Mysql/Category");
const ErrorResponse = require("../responses/errorResponse");

const addCategory = asyncMiddleware(async (req, res, next) => {
  const { name, slug } = req.body;
  const { id: userId } = req.user;
  await Category.create({ name, slug, userId });

  res.status(201).json({
    success: true,
    message: "Created category successfully!",
  });
});

const getCategory = asyncMiddleware(async (req, res, next) => {
  const category = await Category.findAll({});

  res.json({
    success: true,
    data: category,
  });
});

const deleteCategory = asyncMiddleware(async (req, res, next) => {
  const { id } = req.body;
  const { id: userId } = req.user;

  const afftectCount = await Category.destroy({ where: { id, userId } });

  if (!afftectCount) {
    throw new ErrorResponse(404, "Category not found!");
  }

  res.json({
    success: true,
    message: "Deleted successfully!",
  });
});

const updateCategory = asyncMiddleware(async (req, res, next) => {
  const { id: userId } = req.user;
  const { name, slug } = req.body;
  const { id } = req.params;

  const afftectCount = await Category.update(
    { name, slug },
    { where: { id, userId } }
  );

  if (!afftectCount.length) {
    throw new ErrorResponse(404, "Category not found!");
  }

  res.json({
    success: true,
    message: "Updated successfully!",
  });
});

module.exports = { addCategory, getCategory, deleteCategory, updateCategory };
