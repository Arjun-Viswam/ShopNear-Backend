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
        .collection(collection.USER_COLLECTION)
        .findOne({ email: userData.email });
      let mobile = await db
        .get()
        .collection(collection.USER_COLLECTION)
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
      data.block = true
      db.get()
        .collection(collection.USER_COLLECTION)
        .insertOne(data)
        .then((res) => {
          db.get()
            .collection(collection.USER_COLLECTION)
            .findOne({ _id: res.insertedId })
            .then((data) => {
              resolve(data);
            });
        });
    });
  },

  doLogin: (userData) => {
    console.log(userData);
    return new Promise(async (resolve, reject) => {
      let response = {};
      let user = await db
        .get()  
        .collection(collection.USER_COLLECTION)
        .findOne({ email: userData.email });
      if (user) {
        console.log("sssssssssssss");
        bcrypt.compare(userData.password, user.password).then((status) => {
          console.log("kkkkkkkkkkkkkkkkkkkk");
          if (status) {
            if (user.block) {
              response.block = true;  
              resolve(response);
            } else {
              response.user = user;
              response.status = true;
              console.log(response);
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
  doAuthLogin: (data) => {  
    let response = {}
    return new Promise(async (resolve, reject) => {
      if(data.providerId == "github.com"){
        let user = await db
        .get()
        .collection(collection.USER_COLLECTION)
        .findOne({ oauthAccessToken: data.oauthAccessToken });
        if(user){
          response.user = user;
          response.status = true;
          resolve(response);
        } else {
          db.get().collection(collection.USER_COLLECTION).insertOne(data).then((response)=>{
            console.log(response);
            db.get().collection(collection.USER_COLLECTION).findOne({ _id: response.insertedId }).then((data)=>{
                resolve(data)
              })
            })
        }
      }else if(data.providerData[0].providerId == "google.com"){
        let userData = data.providerData[0];
      let user = await db
        .get()
        .collection(collection.USER_COLLECTION)
        .findOne({ uid: userData.uid });
      if (user) {
        response.user = user;
        response.status = true;
        resolve(response);
      } else {
        db.get().collection(collection.USER_COLLECTION).insertOne(userData).then((response)=>{
        console.log(response);
        db.get().collection(collection.USER_COLLECTION).findOne({ _id: res.insertedId }).then((data)=>{
            resolve(data)
          })
        })
      }
      }
      
    });
  },
};
