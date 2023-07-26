const Address = require("./Address");
const Category = require("./Category");
const Coupon = require("./Coupon");
const Order = require("./Order");
const Order_Product = require("./OrderProduct");
const Product = require("./Product");
const Role = require("./Role");
const User = require("./User");

//Role - User
Role.hasMany(User, {
  foreignKey: "role",
});
User.belongsTo(Role, {
  foreignKey: "role",
});

//Address - User
User.hasOne(Address, {
  foreignKey: "userId",
});
Address.belongsTo(User, {
  foreignKey: "userId",
});

//Category - User
User.hasMany(Category, {
  foreignKey: "userId",
});
Category.belongsTo(User, {
  foreignKey: "userId",
});

//Category - Product
Category.hasMany(Product, {
  foreignKey: "categoryId",
});
Product.belongsTo(Category, {
  foreignKey: "categoryId",
});

//Product - Order
Product.belongsToMany(Order, {
  through: Order_Product,
  foreignKey: "productId",
});
Order.belongsToMany(Product, { through: Order_Product, foreignKey: "orderId" });
Order_Product.belongsTo(Order, { foreignKey: "orderId" });
Order_Product.belongsTo(Product, { foreignKey: "productId" });

//User - Order
User.hasMany(Order, {
  foreignKey: "userId",
});
Order.belongsTo(User, {
  foreignKey: "userId",
});

//Coupon - Order
Coupon.hasMany(Order, {
  foreignKey: "couponId",
});
Order.belongsTo(Coupon, {
  foreignKey: "couponId",
});
