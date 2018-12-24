var express = require('express');
var router = express.Router();
const UserService=require("../service/captcha-service.js");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// get 请求 "/api/captcha/gen"，生成验证码
router.get('/captcha/gen',UserService.genCode);

// get 请求 "/api/captcha/verify"，校验验证码
router.get('/captcha/verify',UserService.verify);

module.exports = router;
