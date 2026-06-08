const express = require("express");
const router = express.Router();

const { getGroups } = require("../controllers/groups");

router.get("/", getGroups);

module.exports = router;
