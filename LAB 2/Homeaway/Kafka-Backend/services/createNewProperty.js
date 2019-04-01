const PropertyModel = require("../model/propertymodel");

function handle_request(msg, callback) {
  console.log("Inside Create New Property Request Handler >> Kafka-Server");
  console.log("Attempting to push Object to Mongo DB >> ");
  let addressline1=msg.addressline1;
  let addressline2=msg.addressline2;
  let city=msg.city;
  let state=msg.state;
  let zip=msg.zip;
  let country=msg.country;
  let phone=msg.phone;
  let headline=msg.headline;
  let description=msg.description;
  let placetype=msg.placetype;
  let bedrooms=msg.bedrooms;
  let bathrooms=msg.bathrooms;
  let accomodates=msg.accomodates;
  let currency=msg.currency;
  let baserent=msg.baserent;
  let minimumstay=msg.minimumstay;
  let availablefrom=msg.availablefrom;
  let availableto=msg.availableto;
  let photos=msg.photos;
  let email=msg.email;

  console.log({
    addressline1,
    addressline2,
    city,
    state,
    zip,
    country,
    phone,
    headline,
    description,
    placetype,
    bedrooms,
    bathrooms,
    accomodates,
    currency,
    baserent,
    minimumstay,
    availablefrom,
    availableto,
    photos,
    email
  })
  const property = PropertyModel.create({
    addressline1,
    addressline2,
    city,
    state,
    zip,
    country,
    phone,
    headline,
    description,
    placetype,
    bedrooms,
    bathrooms,
    accomodates,
    currency,
    baserent,
    minimumstay,
    availablefrom,
    availableto,
    photos,
    email
  })
    .then(() => {
      callback(null, property);
    })
    .catch(err => {
      callback(null, err);
    });
  console.log("Callback Triggered in handle_request");
}

exports.handle_request = handle_request;
