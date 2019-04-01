const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
  message: {
    type: String,
    required: true
  },
  subject: {
    type: String,
    required: true
  },
  sender: {
    type: String,
    required: true
  },
  reciever: {
    type: String,
    required: true
  },
  sent: {
    type: Date,
    required: true
  },
  reply: {
    type: String,
    required: false
  }



});

const MessageModel = mongoose.model("message", MessageSchema,"messages");

module.exports = MessageModel;
