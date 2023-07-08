const { env } = require("../config/env");
const asyncMiddleware = require("../middleware/asyncMiddleware");
const User = require("../models/User");
const Address = require("../models/Address");
const ErrorResponse = require("../responses/errorResponse")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")

const register = asyncMiddleware( async (req, res, next)=>{
    const {username, email, password, phone} = req.body;

    const user = await User.findOne({where: {email}});
    if(user) {
        throw new ErrorResponse(409, "Email have been used!")
    }

    const hashedPassword = bcrypt.hashSync(password, 12);

    const newUser = await User.create({username, email, phone, password: hashedPassword});
    await Address.create({userId: newUser.id})

    res.status(201).json({
        success: true,
        message: "registerd successfully!"
    })
})

const login = asyncMiddleware( async (req, res, next)=>{
    const {email, password} = req.body;

    const user = await User.findOne({where: {email}});
    if(!user) {
        throw new ErrorResponse(401, "Invalid Email/Password")
    }

    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if(!isPasswordValid) {
        throw new ErrorResponse(401, "Invalid Email/Password")
    }

    const token = jwt.sign({id: user.id}, env.SECRET_KEY, {expiresIn: env.EXPIRED_IN});

    res.status(200).json({
        success: true,
        token
    })
})

module.exports = {register, login}