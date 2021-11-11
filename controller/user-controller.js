var userHelper = require("../helpers/user-helpers");
var jwt = require("jsonwebtoken");

module.exports = {
  checkData: (req, res, next) => {
    userHelper.checkdata(req.body).then((response) => {
      res.status(200).json({ response });
    });
  },

  signUp: (req, res, next) => {
    userHelper.signup(req.body).then((data) => {
      let token = jwt.sign({ data }, process.env.ACCESS_TOKEN_USER, {
        expiresIn: 10000000000,
      });
      res.json({ data, token });
    });
  },

  login: (req, res, next) => {
    userHelper.doLogin(req.body).then((data) => {
      let token = jwt.sign({ data }, process.env.ACCESS_TOKEN_USER, {
        expiresIn: 10000000000,
      });
      res.json({ data, token });
    });
  },
  authLogin: (req, res, next) => {
    userHelper.doAuthLogin(req.body).then((data)=>{
      let token = jwt.sign({ data }, process.env.ACCESS_TOKEN_USER, {
        expiresIn: 10000000000,
      });
     res.status(200).json({data, token})
    })
  }
};
