var express = require("express");
var router = express.Router();
var controller = require("../controller/admin-controller")

router.post("/login",controller.adminlogin)

module.exports=router