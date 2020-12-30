/* Dotenv config */
require("dotenv").config();

/* Import Packages */
const express = require('express');
const mongoose = require('mongoose');

/* App config */
const app = express();
const port = process.env.APP_PORT;

/* Database connection */
mongoose.connect(
    process.env.MONGO_URL,
    {useNewUrlParser: true,
    useCreateIndex: true}
) .then(() => console.log("Database Connected"))

mongoose.connection.on('error', err => {
    console.log(`Database connection error: ${err.message}`)
})

/* Routes */
app.get("/", (req, res) => {
    res.send("SportShop-Web-BE")
})

/* App.listen */
app.listen(port, () =>
  console.log(`[🚀 Server] App listening on port ${port}!`)
);