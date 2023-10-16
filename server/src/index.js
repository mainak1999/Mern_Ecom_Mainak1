const express = require("express");

const cors = require("cors")


const app = express()

app.use(express.json())

app.use(cors())




const authRouters=require("./routes/auth.route");
app.use("/auth",authRouters);

const userRouters = require("./routes/user.route");
app.use("/api/users",userRouters);

const productRouter = require("./routes/product.routes");
app.use("/api/products",productRouter);

const adminProductRouter = require("./routes/adminProduct.routes");
app.use("/api/admin/products",adminProductRouter);

const cartRouter = require("./routes/cart.route");
app.use("/api/cart",cartRouter);

const cartItemRouter = require("./routes/cartItem.routes");
app.use("/api/cart_items",cartItemRouter);

const orderRouter = require("./routes/order.routes");
app.use("/api/orders",orderRouter);

const reviewRouter = require("./routes/review.routes");
app.use("/api/reviews",reviewRouter);

const ratingRouter = require("./routes/rating.routes");
app.use("/api/ratings",ratingRouter);

const adminOrderRouter = require("./routes/adminOrder.route")
app.use("/api/admin/orders",adminOrderRouter);


const paymentRouter=require("./routes/payment.routes");
app.use("/api/payments",paymentRouter);




module.exports = app;