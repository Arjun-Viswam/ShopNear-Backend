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
    }
}