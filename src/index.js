/* Dotenv config */
require("dotenv").config();

/* Import Packages */
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require('cors');
const {readdirSync} = require("fs");

// const authRoute = require("./routes/authRoute");
// const userRoute = require("./routes/userRoute");
// const categoryRoute = require("./routes/categoryRoute");
// const brandRoute = require("./routes/brandRoute");
// const productRoute = require("./routes/productRoute");
// const subCategoryRoute = require("./routes/subCategoryRoute");

/* App config */
const app = express();
const port = process.env.APP_PORT;

/* Database connection */
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database Connected"));

mongoose.connection.on("error", (err) => {
  console.log(`Database connection error: ${err.message}`);
});

/* Middlewares */
app.use(morgan("dev"));
app.use(bodyParser.json({ limit: "2mb" }));
app.use(cookieParser());
app.use(cors());

/* Routes */
app.get("/", (req, res) => {
  res.send("SportShop-Web-BE");
});

readdirSync("./routes").map((r) => app.use("/api", require("./routes/" + r)));

// app.use("/auth", authRoute);
// app.use("/profile", userRoute);
// app.use("/admin", categoryRoute);
// app.use("/admin", brandRoute);
// app.use("/admin", productRoute);
// app.use("/admin", subCategoryRoute);

/* App.listen */
app.listen(port, () =>
  console.log(`[🚀 Server] App listening on port ${port}!`)
);
