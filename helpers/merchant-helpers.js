var db = require("../config/connection");
var collection = require("../config/collection");
var objectId = require("mongodb").ObjectID;
const bcrypt = require("bcrypt");
const { ObjectId } = require("bson");

module.exports = {
  checkdata: (userData) => {
    return new Promise(async (resolve, reject) => {
      let user = await db
        .get()
        .collection(collection.MERCHANTS_COLLECTION)
        .findOne({ email: userData.email });
      let mobile = await db
        .get()
        .collection(collection.MERCHANTS_COLLECTION)
        .findOne({ mobile: userData.mobile });
      if (user) {
        resolve({ existing: true });
      } else if (mobile) {
        resolve({ mobileExist: true });
      } else {
        resolve({ status: true });
      }
    });
  },

  signup: (data) => {
    return new Promise(async (resolve, reject) => {
      data.password = await bcrypt.hash(data.password, 10);
      db.get()
        .collection(collection.MERCHANTS_COLLECTION)
        .insertOne(data)
        .then((res) => {
          db.get()
            .collection(collection.MERCHANTS_COLLECTION)
            .findOne({ _id: res.insertedId })
            .then((data) => {
              resolve(data);
            });
        });
    });
  },

  doMerchantLogin: (userData) => {
    console.log(userData);
    return new Promise(async (resolve, reject) => {
      let response = {};
      let user = await db
        .get()
        .collection(collection.MERCHANTS_COLLECTION)
        .findOne({ email: userData.email });
      if (user) {
        bcrypt.compare(userData.password, user.password).then((status) => {
          if (status) {
            if (user.block) {
              response.block = true;
              resolve(response);
            } else {
              response.user = user;
              response.status = true;
              resolve(response);
            }
          } else {
            resolve({ status: false });
          }
        });
      } else {
        resolve({ status: false });
      }
    });
  },
 
};
