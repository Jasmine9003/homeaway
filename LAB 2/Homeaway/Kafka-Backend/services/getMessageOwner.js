


const UserModel = require("../model/usermodel");
const MessageModel = require("../model/messageModel");

function handle_request(msg, callback) {
  console.log("Inside Get Owner Messages Request Handler >> Kafka-Server");
  console.log("Object to Find: >>>>>>>>>>>>>>\n", msg.email);
  let email =msg.email;
  UserModel.findOne({ email: email })
  .then(user => {
    let messageIDs = user.ownermessages;
    MessageModel.find({
      _id: { $in: messageIDs }
    })
      .then(messages => {
      callback(null, messages)
      })
      .catch(err => {
      callback(null, err);
    });
  })
  .catch(err => {
    callback(null, err);

  });

  console.log("Callback Triggered in handle_request");
}

exports.handle_request = handle_request;
