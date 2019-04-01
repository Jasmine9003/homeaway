const MessageModel = require("../model/messageModel");

function handle_request(msg, callback) {
  console.log("Inside Set Owner Reply Request Handler >> Kafka-Server");
  console.log("Object to Find: >>>>>>>>>>>>>>\n", msg.pid);
  let mid = msg.mid;
  let reply = msg.reply;
  MessageModel.findOneAndUpdate(
    { _id: mid },
    {
      reply: reply
    }
  )
    .then(message => {
      callback(null, message);
    })
    .catch(err => {
      callback(null, err);
    });

  console.log("Callback Triggered in handle_request");
}

exports.handle_request = handle_request;
