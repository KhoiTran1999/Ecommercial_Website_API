require("dotenv").config()
const express = require("express");
const { env } = require("./config/env");
const { connectDB } = require("./database/connectDB");
const morgan = require("morgan");
const errorMiddleware = require("./middleware/errorMiddleware")
const app = express();
const PORT = env.PORT;
require("./models/relationships")
const authRouter = require("./routers/auth");
const roleRouter = require("./routers/role");
const userRouter = require("./routers/User");
const categoryRouter = require("./routers/category");
const productRouter = require("./routers/product");
const orderRouter = require("./routers//order");
const Role = require("./models/Role");
const { roleConstant } = require("./constant/Role");

//Middleware
app.use(morgan("dev"));
app.use(express.json());

//Auth API
app.use("/auth", authRouter)

//Role API
app.use("/role", roleRouter)

//Address API
app.use("/user", userRouter)

//Category API
app.use("/category", categoryRouter)

//Product API
app.use("/product", productRouter)

//Order API
app.use("/order", orderRouter)

//Middleware
app.use(errorMiddleware)

connectDB()
  .then(() => {
    console.log("DB have been connected");
  })
  .then(()=>{
    Role.bulkCreate(roleConstant, {ignoreDuplicates: true})
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
