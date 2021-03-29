/* Dotenv config */
require("dotenv").config();

/* Import Packages */
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require('cors');

const authRoute = require("./routes/authRoute");
const userRoute = require("./routes/userRoute");
const categoryRoute = require("./routes/categoryRoute");
const productRoute = require("./routes/productRoute");
const brandRoute = require("./routes/brandRoute");
const subCategoryRoute = require("./routes/subCategoryRoute");
const cloudinaryRoute = require("./routes/cloudinaryRoute");
const couponRoute = require("./routes/couponRoute");
const stripeRoute = require("./routes/stripeRoute");

/* App config */
const app = express();
const port = process.env.APP_PORT;

/* Database connection */
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database Connected"));

mongoose.connection.on("error", (err) => {
  console.log(`Database connection error: ${err.message}`);
});

/* Middlewares */
app.use(morgan("dev"));
app.use(bodyParser.json({ limit: "2mb" }));
app.use(cors());

/* Routes */
app.get("/", (req, res) => {
  res.send("SportShop-Web-BE");
});

app.use("/api", authRoute);
app.use("/api", userRoute);
app.use("/api", categoryRoute);
app.use("/api", productRoute);
app.use("/api", brandRoute);
app.use("/api", subCategoryRoute);
app.use("/api", cloudinaryRoute);
app.use("/api", couponRoute)
app.use("/api", stripeRoute)

/* App.listen */
app.listen(port, () =>
  console.log(`[🚀 Server] App listening on port ${port}!`)
);
