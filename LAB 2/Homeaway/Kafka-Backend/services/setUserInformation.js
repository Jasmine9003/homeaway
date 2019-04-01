const UserModel = require("../model/usermodel");

function handle_request(msg, callback) {
  console.log("Inside Get User Request Handler >> Kafka-Server");
  console.log("Object to Find: >>>>>>>>>>>>>>\n", msg.email);

  UserModel.findOneAndUpdate({ email: msg.email },
    {
      fname: msg.fname,
      lname: msg.lname,
      aboutme: msg.aboutme,
      city: msg.city,
      school: msg.school,
      hometown: msg.hometown,
      languages: msg.languages,
      gender: msg.gender,
      phone: msg.phone,
    } 
    ).then(
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
