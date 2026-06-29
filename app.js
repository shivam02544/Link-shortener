const express = require("express");
const requestIdMiddleware =
  require("./middlewares/requestId.middleware");

const urlRoutes = require("./routes/url.routes");

const app = express();


// MIDDLEWARE
app.use(express.json());
app.use(requestIdMiddleware);

app.use((req, res, next) => {

  console.log(
    `[${req.requestId}] ${req.method} ${req.url}`
  );

  next();
});


// ROUTES
app.use("/", urlRoutes);


module.exports = app;