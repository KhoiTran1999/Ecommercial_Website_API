const asyncMiddleware = require("../middleware/asyncMiddleware");
const Order = require("../models/Order");
const Order_Product = require("../models/OrderProduct");
const Product = require("../models/Product");
const User = require("../models/User");
const Address = require("../models//Address");

const createOrder = asyncMiddleware(async (req, res, next)=>{
    const {productList, note} = req.body
    const {id: userId} = req.user

    const order = await Order.create({note, userId});

    productList.map(val=>{
        Order_Product.create({quantity: val.quantity, orderId: order.id, productId: val.id})
    })

    res.status(201).json({
        success: true,
        message: "Created order successfully!"
    })
})

const getOrder = asyncMiddleware(async (req, res, next)=>{
    const {id: userId} = req.user

    const order = await Order.findAll({where: {userId}, include: [Product, {
        model: User,
        attributes: {exclude: ["createdAt", "updatedAt", "password"]},
        include: [Address]
    }]})

    res.status(200).json({
        success: true,
        data: order
    })
})

const getOrderById = asyncMiddleware(async (req, res, next)=>{
    const {id: userId} = req.user
    const {id} = req.params

    const order = await Order.findAll({where: {id, userId}, include: [Product]})

    res.status(200).json({
        success: true,
        data: order
    })
})

module.exports = {createOrder, getOrder, getOrderById}