const express = require("express");
const router = express.Router();
const { getOrganizations } = require("../controllers/organizations");

router.get("/", getOrganizations);

module.exports = router;
