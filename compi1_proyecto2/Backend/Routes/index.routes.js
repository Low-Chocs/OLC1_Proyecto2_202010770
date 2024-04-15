const { Router } = require('express');
const router = Router();
const { Controller } = require("../Controller/Controller");

// Controller
const controller = new Controller()

// Routes
router.get("/", controller.running);
router.post("/analizar", controller.parser);
router.post("/test", controller.test);

module.exports = router;