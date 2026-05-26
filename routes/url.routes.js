const express = require("express");

const {
  createShortURLController,
  redirectURLController
} = require("../controller/url.controller");
const rateLimitMiddleware = require("../middlewares/rateLimit.middleware");

const router = express.Router();


// CREATE SHORT URL
router.post(
  "/url",
  rateLimitMiddleware,
  createShortURLController
);


// REDIRECT URL
router.get(
  "/:code",
  redirectURLController
);


module.exports = router;