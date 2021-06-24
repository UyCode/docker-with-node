const express = require('express');
const authController = require('../controller/authController.js');
const router = express.Router();

router.post("/signup", authController.signUp);

module.exports = router;
