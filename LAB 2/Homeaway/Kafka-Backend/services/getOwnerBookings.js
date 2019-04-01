const BookingModel = require("../model/bookingmodel");

function handle_request(msg, callback) {
  console.log("Inside GetOwner Bookings Request Handler >> Kafka-Server");
  console.log("Object to Find: >>>>>>>>>>>>>>\n", msg.email);
    let email=msg.email;
  BookingModel.find({ propertyowneremail: email })
    .then(bookings => {
    callback(null, bookings);
    })
    .catch(err => {
    callback(null,err);
    });

  console.log("Callback Triggered in handle_request");
}

exports.handle_request = handle_request;
