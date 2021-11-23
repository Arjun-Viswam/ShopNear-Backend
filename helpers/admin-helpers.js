var db = require("../config/connection");
var collection = require("../config/collection");
var objectId = require("mongodb").ObjectID;
const bcrypt = require("bcrypt");
const { ObjectId } = require("bson");

module.exports = {
  adminLogin: (data) => {
    return new Promise(async (resolve, reject) => {
      let response = {};
      let user = await db
        .get()
        .collection(collection.ADMIN_COLLECTION)
        .findOne({ email: data.email });
      if (user) {
        bcrypt.compare(data.password, user.password).then((status) => {
          if (status) {
            response.user = user;
            response.status = true;
            resolve(response);
          } else {
            resolve({ status: false });
          }
        });
      } else {
        resolve({ status: false });
      } 
    });
  },
  manageShop:()=>{
    return new Promise((resolve,reject)=>{
      db.get().collection(collection.MERCHANTS_COLLECTION).find().toArray().then((data)=>{
        resolve(data)
      })
    })
  },
  blockShop:(shopID)=>{
    return new Promise((resolve,reject)=>{
      db.get().collection(collection.MERCHANTS_COLLECTION).updateOne({_id:objectId(shopID)},
      {
        $set:{"block":true}
      }).then(()=>{
        resolve()
      })
    })
  },
  unblockShop : (shopID)=>{
    return new Promise((resolve,reject)=>{
      db.get().collection(collection.MERCHANTS_COLLECTION).updateOne({_id:objectId(shopID)},
      {
        $set:{"block":false}
      }).then(()=>{
        resolve()
      })
    })
  },
  manageUser : () => {
    return new Promise((resolve,reject)=>{
      db.get().collection(collection.USER_COLLECTION).find().toArray().then((users)=>{
        resolve(users)
      })
    })
  },
  blockUser:(userID)=>{
    return new Promise((resolve,reject)=>{
      db.get().collection(collection.USER_COLLECTION).updateOne({_id:objectId(userID)},
      {
        $set:{"block":true}
      }).then(()=>{
        resolve()
      })
    })
  },
  unblockUser : (userID)=>{
    return new Promise((resolve,reject)=>{
      db.get().collection(collection.USER_COLLECTION).updateOne({_id:objectId(userID)},
      {
        $set:{"block":false}
      }).then(()=>{
        resolve()
      })
    })
  },
};
