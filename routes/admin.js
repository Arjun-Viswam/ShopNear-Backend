var express = require("express");
var router = express.Router();
var controller = require("../controller/admin-controller")

router.post("/login",controller.adminlogin)
router.get("/shop_management",controller.shopManage)
router.post("/block",controller.block)
router.post("/unblock",controller.unblock)
router.get("/user_manager",controller.userManage)

router.post("/block_user",controller.userBlock)
router.post("/unblock_user",controller.userUnblock)
module.exports=router