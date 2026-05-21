const express = require("express");

const urlRoutes = require("./routes/url.routes");

const app = express();


// MIDDLEWARE
app.use(express.json());


// ROUTES
app.use("/", urlRoutes);


module.exports = app;