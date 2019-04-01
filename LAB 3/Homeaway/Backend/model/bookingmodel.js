const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;

ObjectId.prototype.valueOf = function() {
  return this.toString();
};
const Schema = mongoose.Schema;

const BookingSchema = new Schema({
  bookingfrom: {
    type: String,
    required: true
  },
  bookingto: {
    type: String,
    required: true
  },
  travelleremail: {
    type: String,
    required: true
  },
  propertyowneremail: {
    type: String,
    required: true
  },
  propertyid: {
    type: String,
    required: true
  },
  nights: {
    type: Number,
    required: true
  },
  cost: {
    type: Number,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  currency: {
    type: String,
    required: true
  },
  propertyname: {
    type: String,
    required: true
  }  



});

const BookingModel = mongoose.model("booking", BookingSchema,"bookings");

module.exports = BookingModel;
