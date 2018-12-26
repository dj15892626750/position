var express = require('express');
var router = express.Router();
const PositionService=require("../service/position-service.js");
const path = require("path");

// 引入 multer 中间件
const multer = require("multer");

// 配置磁盘存储
var storage = multer.diskStorage({
  // 存储在服务器上的目标目录
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../public/imgs/upload/"));
  },
  // 存储的文件命名规则
  filename: function (req, file, cb) {
  	// file.fieldname：文件在表单中的文件域元素名称
  	// file.originalname：在用户电脑中文件的名称
  	const start = file.originalname.lastIndexOf("."); // 最后一个 . 的位置
  	const ext = file.originalname.slice(start); // 从最后一个 . 截取到字符串末尾，作为文件的后缀名
    cb(null, file.fieldname + '-' + Date.now() + ext);
  }
}) 
var upload = multer({ storage: storage });

router.post("/add.do",upload.single("logo"), PositionService.add);

router.post("/update.do",upload.single("logo"),PositionService.update);

router.get("/find.do",PositionService.find);

router.post("/delete.do",PositionService.delete);

router.get("/findPage.do",PositionService.findPage);

module.exports = router;