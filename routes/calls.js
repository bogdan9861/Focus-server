const express = require("express");
const router = express.Router();

const { sendCall } = require("../controllers/calls");
const { auth } = require("firebase-admin");

router.post("/initiate", auth, sendCall);

module.exports = router;
