var express = require('express');
var router = express.Router();
const UserService=require("../service/user-service.js");

router.post("/login.do",UserService.login);

router.post("/register.do",UserService.register);

module.exports = router;
