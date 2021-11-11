var express = require("express")
var router = express.Router()
var controller = require("../controller/user-controller")

router.post('/checkData',controller.checkData)
router.post('/signup',controller.signUp)
router.post('/userLogin',controller.login)
router.post('/socialAuth',controller.authLogin)

module.exports=router