const UserModel = require("../model/usermodel");
const MessageModel = require("../model/messageModel");

function handle_request(msg, callback) {
  console.log("Inside Create New Message Handler >> Kafka-Server");
  console.log("Object to Add: >>>>>>>>>>>>>>\n", msg.subject);
  let message = msg.message;
  let subject = msg.subject;
  let sender = msg.sender;
  let reciever = msg.reciever;
  let sent = msg.sent;
 MessageModel.create({
    message,
    subject,
    sender,
    reciever,
    sent
  })
    .then(newMessage => {
      UserModel.findOneAndUpdate(
        { email: sender },
        {
          $push: {
            travelmessages: newMessage._id
          }
        }
      )
        .then(() => {
          UserModel.findOneAndUpdate(
            { email: reciever },
            {
              $push: {
                ownermessages: newMessage._id
              }
            }
          )
            .then(() => {
            callback(null, newMessage)
            })
            .catch((err) => {
              callback(null, err)

            });
        })
        .catch((err) => {
          callback(null, err)

        });
    })
    .catch(err => {
      callback(null, err)

    });

    console.log("Callback Triggered in handle_request");



}

exports.handle_request = handle_request;
