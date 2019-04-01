const UserModel = require("../model/usermodel");

function handle_request(msg, callback) {
  console.log("Inside Get User Request Handler >> Kafka-Server");
  console.log("Object to Find: >>>>>>>>>>>>>>\n", msg.email);

  UserModel.findOne({ email: msg.email }).then(
    user => {
      callback(null, user);
    },
    err => {
      callback(null, err);
    }
  );

  console.log("Callback Triggered in handle_request");
}

exports.handle_request = handle_request;
