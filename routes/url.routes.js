const express = require("express");

const {
  createShortURLController,
  redirectURLController
} = require("../controller/url.controller");

const router = express.Router();


// CREATE SHORT URL
router.post(
  "/url",
  createShortURLController
);


// REDIRECT URL
router.get(
  "/:code",
  redirectURLController
);


module.exports = router;