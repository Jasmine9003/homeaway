const PropertyModel = require("../model/propertymodel");
var moment = require("moment");
moment.suppressDeprecationWarnings = true;

function findIntersections(a, b) {
  let temp;
  if (b.length > a.length) (temp = b), (b = a), (a = temp);
  return a.filter(function(e) {
    return b.indexOf(e) > -1;
  });
}

getDates = function(startDate, endDate) {
  var dates = [],
    currentDate = startDate,
    addDays = function(days) {
      var date = new Date(this.valueOf());
      date.setDate(date.getDate() + days);
      return date;
    };
  while (currentDate <= endDate) {
    dates.push(currentDate);
    currentDate = addDays.call(currentDate, 1);
  }
  return dates;
};

var isPropertyAvailable = (property, startDate, endDate) => {
  return new Promise(function(resolve, reject) {
    let busydays = [];
    let requireddays = [];
    let bookings = property.bookings;

    bookings.forEach(booking => {
      let dates = getDates(booking.bookingfrom, booking.bookingto);
      dates.forEach(date => {
        busydays.push(moment(date).format("YYYY-MM-DD"));
      });
    });

    let rdates = getDates(startDate, endDate);
    rdates.forEach(rdate => {
      requireddays.push(moment(rdate).format("YYYY-MM-DD"));
    });


    let intersection = findIntersections(requireddays, busydays);
    if (intersection.length > 0) {
      resolve(intersection.length);
    } else {
      resolve(0);
    }
  });
};

var filterProperties = (properties, startDate, endDate) => {
  return new Promise(function(resolve, reject) {
    let newProperties = [];
    try {
      properties.forEach(property => {
        isPropertyAvailable(property, startDate, endDate).then(go => {
          if (go > 0) {
          } else {
            newProperties.push(property);
          }
        });
      });
      resolve(newProperties);
    } catch (e) {
      reject("Something Went Wrong");
    }
  });
};

function handle_request(msg, callback) {
  var startDate = moment(msg.startDate, "MM/DD/YYYY").toDate();
  var endDate = moment(msg.endDate, "MM/DD/YYYY").toDate();
  var where = msg.where;
  var people = msg.people;
  let data = {
    startDate,
    endDate,
    where,
    people
  };

  console.log("Inside Get Properties Where Request Handler >> Kafka-Server");
  console.log("Object to Find: >>>>>>>>>>>>>>\n", data);

  PropertyModel.find({
    availablefrom: {
      $lte: startDate
    },
    availableto: {
      $gte: endDate
    },
    $or: [
      { city: { $regex: where, $options: "i" } },
      { state: { $regex: where, $options: "i" } },
      { country: { $regex: where, $options: "i" } }
    ],
    accomodates: {
      $gte: people
    }
  }).then(properties => {
    filterProperties(properties, startDate, endDate)
      .then(filteredProperties => {
        console.log("Filtered Properties: ", filteredProperties.length);
        callback(null, filteredProperties);
      })
      .catch(
        err => {
          callback(null, err);
        }
      );
  });


  console.log("Callback Triggered in handle_request");


}

exports.handle_request = handle_request;
