const express = require('express');
const router = express.Router();

// Controller
const indexController = require("../Controller/controller.js");

// Routes
router.get("/", indexController.index);
router.post("/analizar", indexController.analizar);

module.exports = router;