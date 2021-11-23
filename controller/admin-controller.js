var adminHelper = require("../helpers/admin-helpers")
var jwt = require("jsonwebtoken")

module.exports = {
    adminlogin : (req,res,next)=>{
        adminHelper.adminLogin(req.body).then((data)=>{
            let token = jwt.sign({ data }, process.env.ACCESS_TOKEN_ADMIN, {
                expiresIn: 10000000000,
            })
            res.status(200).json({data, token})
        })
    },
    shopManage : (req,res,next)=>{
        adminHelper.manageShop().then((shops)=>{
            res.status(200).json(shops)
        })
    },
    block: (req,res,next)=>{
        adminHelper.blockShop(req.body.shopID).then(()=>{
            res.status(200).json({ status:true })
        })
    },
    unblock : (req,res,next) => {
        adminHelper.unblockShop(req.body.shopID).then(() => {
            res.status(200).json({ status:true })
        })
    },
    userManage : (req,res,next) => {
        adminHelper.manageUser().then((user)=>{
            res.status(200).json(user)
        })
    },
    userBlock : (req,res,next) => {
        console.log("sasi on fire");
        adminHelper.blockUser(req.body.userID).then(()=>{
            res.status(200).json({ status : true })
        })
    },
    userUnblock : (req,res,next)=>{
        adminHelper.unblockUser(req.body.userID).then(()=>{
            res.status(200).json({ status : true })
        })
    },
    
}