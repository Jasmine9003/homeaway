const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PropertySchema = new Schema({
  addressline1: {
    type: String,
    required: true
  },
  addressline2: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  zip: {
    type: Number,
    required: true
  },
  country: {
    type: String,
    required: true
  },
  phone: {
    type: Number,
    required: true
  },
  headline: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  placetype: {
    type: String,
    required: true
  },
  bedrooms: {
    type: Number,
    required: true
  },
  bathrooms: {
    type: Number,
    required: true
  },
  accomodates: {
    type: Number,
    required: true
  },
  currency: {
    type: String,
    required: true
  },
  baserent: {
    type: Number,
    required: true
  },
  minimumstay: {
    type: Number,
    required: true
  },
  availablefrom: {
    type: Date,
    required: true
  },
  availableto: {
    type: Date,
    required: true
  },
  photos: {
    type: [String],
    required: true
  },
  email: {
    type: String,
    required: true
  }
});

const PropertyModel = mongoose.model("property", PropertySchema,"properties");

module.exports = PropertyModel;
