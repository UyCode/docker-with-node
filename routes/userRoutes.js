const express = require('express');
const authController = require('../controller/authController.js');
const router = express.Router();

router.post("/signup", authController.signUp);
router.post("/login", authController.login);

module.exports = router;
