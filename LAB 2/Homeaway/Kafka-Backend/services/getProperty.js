const PropertyModel = require("../model/propertymodel");

function handle_request(msg, callback) {
  console.log("Inside Get Property Request Handler >> Kafka-Server");
  console.log("Object to Find: >>>>>>>>>>>>>>\n", msg.pid);

  PropertyModel.findOne({ _id: msg.pid }).then(
    property => {
      callback(null, property);
    },
    err => {
      callback(null, err);
    }
  );

  console.log("Callback Triggered in handle_request");
}

exports.handle_request = handle_request;
