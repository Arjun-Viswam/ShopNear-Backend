var express = require("express")
var router = express.Router()
var controller = require("../controller/merchant-controller")

router.post('/checkData',controller.checkData)
router.post('/signup',controller.signUp)
router.post('/shopLogin',controller.merchantlogin)

module.exports=router