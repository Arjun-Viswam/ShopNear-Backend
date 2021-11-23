var merchantHelper = require("../helpers/merchant-helpers");
var jwt = require("jsonwebtoken");

module.exports = {
  checkData: (req, res, next) => {
    merchantHelper.checkdata(req.body).then((response) => {
      res.status(200).json({ response });
    });
  },

  signUp: (req, res, next) => {
    merchantHelper.signup(req.body).then((data) => {
      let token = jwt.sign({ data }, process.env.ACCESS_TOKEN_MERCHANT, {
        expiresIn: 10000000000,
      });
      res.json({ data, token });
    });
  },

  merchantlogin: (req, res, next) => {
    merchantHelper.doMerchantLogin(req.body).then((data) => {
      let token = jwt.sign({ data }, process.env.ACCESS_TOKEN_MERCHANT, {
        expiresIn: 10000000000,
      });
      res.json({ data, token });
    });
  },
  submitData : (req,res,next) => {
    console.log("sasi is on fire");
    console.log(req.body);
    merchantHelper.submitProduct(req.body).then((res)=> {
      res.status(100).json({status:true})
    })
}
};
