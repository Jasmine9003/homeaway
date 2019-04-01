const BookingModel = require("../model/bookingmodel");

function handle_request(msg, callback) {
  console.log("Inside Get Booking Request Handler >> Kafka-Server");
  console.log("Object to Find: >>>>>>>>>>>>>>\n", msg.bid);

  let bid = msg.bid;
  BookingModel.findOne({ _id: bid })
    .then(booking => {
callback(null,booking)
    })
    .catch(err => {
      callback(null,err)

    });


  console.log("Callback Triggered in handle_request");
}

exports.handle_request = handle_request;
