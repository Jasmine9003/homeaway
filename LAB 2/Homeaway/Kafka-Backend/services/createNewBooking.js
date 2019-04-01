const PropertyModel = require("../model/propertymodel");
const BookingModel = require("../model/bookingmodel");

function handle_request(msg, callback) {
  console.log("Inside Create New Booking Request Handler >> Kafka-Server");
  console.log("Attempting to push Object to Mongo DB >> ");
  console.log(msg);
  const booking = BookingModel.create({
    bookingfrom: msg.bookingfrom,
    bookingto: msg.bookingto,
    travelleremail: msg.travelleremail,
    propertyowneremail: msg.propertyowneremail,
    propertyid: msg.propertyid,
    nights: msg.nights,
    cost: msg.cost,
    currency:msg.currency,
    city:msg.city,
    propertyname:msg.propertyname
  })
    .then(book => {
      var newBooking = {
        bid: book._id,
        bookingfrom: msg.bookingfrom,
        bookingto: msg.bookingto
      };

      PropertyModel.findOneAndUpdate(
        { _id: msg.propertyid },
        {
          $push: {
            bookings: newBooking
          }
        },
        (err, doc) => {
          if (err) {
            console.log(err);
            console.log("Addition Failure:\n", err);

            callback(null, err);
          } else {
            console.log("Sucessfully Added Booking\n");
            callback(null, booking);
          }
        }
      );
    })
    .catch(err => {
      console.log(err);
      callback(null, err);
    });

    console.log("Callback Triggered in handle_request");
  }

exports.handle_request = handle_request;
