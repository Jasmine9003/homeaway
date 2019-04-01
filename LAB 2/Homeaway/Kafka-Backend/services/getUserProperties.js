const PropertyModel = require("../model/propertymodel");

function handle_request(msg, callback) {
  console.log("Inside Get User Property Request Handler >> Kafka-Server");
  console.log("Object to Find: >>>>>>>>>>>>>>\n", msg.email);

  PropertyModel.find({ email: msg.email }).then(
    properties => {
      callback(null, properties);
    },
    err => {
      callback(null, err);
    }
  );

  console.log("Callback Triggered in handle_request");
}

exports.handle_request = handle_request;
