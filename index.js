require("dotenv").config();
const express = require("express");
const { env } = require("./config/env");
const { connectMysql } = require("./database/connectMysql");
const morgan = require("morgan");
const errorMiddleware = require("./middleware/errorMiddleware");
const app = express();
const PORT = env.PORT;
require("./models/Mysql/relationships");
const authRouter = require("./routers/auth");
const roleRouter = require("./routers/role");
const userRouter = require("./routers/User");
const categoryRouter = require("./routers/category");
const productRouter = require("./routers/product");
const orderRouter = require("./routers/order");
const couponRouter = require("./routers/coupon");
const fileRouter = require("./routers/file");
const Role = require("./models/Mysql/Role");
const { roleConstant } = require("./constant/Role");
const jwtAuth = require("./middleware/jwtAuth");
const cors = require("cors");
const MongoDB = require("./database/connectMongo");
const rateLimiter = require("./middleware/limiter");

//Middleware
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

//Static API
app.use("/uploads", express.static("uploads"));

//Auth API
app.use("/auth", authRouter);

//Role API
app.use("/role", jwtAuth, roleRouter);

//Address API
app.use("/user", jwtAuth, userRouter);

//Category API
app.use("/category", categoryRouter);

//Product API
app.use("/product", productRouter);

//Order API
app.use("/order", jwtAuth, orderRouter);

//Coupn API
app.use("/coupon", jwtAuth, couponRouter);

//Get file API
app.use("/file", fileRouter);

//Middleware
app.use(errorMiddleware);

//Connect Mysql
connectMysql()
  .then(() => {
    console.log("MySQL have been connected");
  })
  .then(() => {
    Role.bulkCreate(roleConstant, { ignoreDuplicates: true });
  })
  .catch((err) => {
    console.log(err);
  });

//Connect Mongo
MongoDB.connect();

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
