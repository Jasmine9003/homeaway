const express = require("express");
var multer = require("multer");
var mkdirp = require("mkdirp");
const router = express.Router();
var kafka = require("./kafka/client");
const MessageModel = require("../model/messageModel");
const UserModel = require("../model/usermodel");
const BookingModel = require("../model/bookingmodel");
const PropertyModel = require("../model/propertymodel");

var storage = multer.diskStorage({
  destination: function(req, file, callback) {
    const dir = "api/uploads/" + req.body.email + "/";
    mkdirp(dir, err => callback(null, dir));
  },
  filename: function(req, file, callback) {
    var ext = file.originalname.split(".").pop();
    callback(null, file.fieldname + "_" + Date.now() + "." + ext);
  }
});
var upload = multer({ storage: storage });

router.post("/createNewProperty", upload.array("photos"), (req, res, next) => {
  let filenamearray = [];
  req.files.forEach(file => {
    filenamearray.push(file.filename);
  });
  const photos = filenamearray;
  let data = {
    addressline1: req.body.addressline1,
    addressline2: req.body.addressline2,
    city: req.body.city,
    state: req.body.state,
    zip: req.body.zip,
    country: req.body.country,
    phone: req.body.phone,
    headline: req.body.headline,
    description: req.body.description,
    placetype: req.body.placetype,
    bedrooms: req.body.bedrooms,
    bathrooms: req.body.bathrooms,
    accomodates: req.body.accomodates,
    currency: req.body.currency,
    baserent: req.body.nightlybaserent,
    minimumstay: req.body.minimumstay,
    availablefrom: req.body.startDate,
    availableto: req.body.endDate,
    photos,
    email: req.body.email
  };
  console.log("Making Request To Kafka...");
  kafka.make_request("create_new_property", data, function(err, results) {
    console.log("<<Kafka Response Recieved>>");
    if (err) {
      console.log("Fetch Error");
      res.status(400).json({
        success: false,
        err
      });
    } else {
      console.log("Addition Successfull");
      res.status(200).json({
        success: true,
        property: results
      });
    }
  });
});

router.get("/getAllPropertiesOfUser", (req, res, next) => {
  console.log("Inside API Request: /getAllPropertiesOfUser");
  let body = {
    email: req.query.email
  };
  console.log("Making Request To Kafka...");
  kafka.make_request("get_user_property", body, function(err, results) {
    console.log("<<Kafka Response Recieved>>");
    if (err) {
      console.log("Fetch Error");
      res.status(400).json({
        success: false,
        err
      });
    } else {
      console.log("Fetch Successfull");
      res.status(200).json({
        success: true,
        properties: results
      });
    }
  });
});

router.get("/getProperty", (req, res, next) => {
  console.log("Inside API Request: /getProperty");
  console.log("Making Request To Kafka...");
  let body = {
    pid: req.query.pid
  };
  kafka.make_request("get_property", body, function(err, results) {
    console.log("<<Kafka Response Recieved>>");
    if (err) {
      console.log("Fetch Error");
      res.status(400).json({
        success: false,
        err
      });
    } else {
      console.log("Fetch Successfull");
      res.status(200).json({
        success: true,
        property: results
      });
    }
  });
});

router.get("/getAllPropertiesWhere", (req, res, next) => {
  console.log("Inside API Request: /getAllPropertiesWhere");
  console.log("Making Request To Kafka...");

  var body = {
    where: req.query.where,
    startDate: req.query.startDate,
    endDate: req.query.endDate,
    people: req.query.people
  };
  kafka.make_request("get_properties_where", body, function(err, results) {
    console.log("<<Kafka Response Recieved>>");
    if (err) {
      console.log("Fetch Error");
      res.status(400).json({
        success: false,
        err
      });
    } else {
      console.log("Fetch Successfull");
      res.status(200).json({
        success: true,
        filteredProperties: results
      });
    }
  });
});

router.post("/createNewBooking", (req, res, next) => {
  console.log("Inside API Request: /createNewBooking");
  console.log("Making Request To Kafka...");
  kafka.make_request("create_new_booking", req.body, function(err, results) {
    console.log("<<Kafka Response Recieved>>");
    if (err) {
      console.log("Fetch Error");
      res.status(400).json({
        success: false,
        err
      });
    } else {
      console.log("Fetch Successfull");
      res.status(200).json({
        success: true,
        booking: results
      });
    }
  });
});

router.post("/createNewMessage", (req, res, next) => {
  console.log("Inside API Request: /createNewMessage");
  console.log("Making Request To Kafka...");
  kafka.make_request("create_new_message", req.body, function(err, results) {
    console.log("<<Kafka Response Recieved>>");
    if (err) {
      console.log("Fetch Error");
      res.status(400).json({
        success: false,
        err
      });
    } else {
      console.log("Fetch Successfull");
      res.status(200).json({
        success: true,
        message: "Message added Successfully"
      });
    }
  });
});

router.get("/getMessageTraveller", (req, res, next) => {
  var body = {
    email: req.query.email
  };
  console.log("Inside API Request: /getMessageTraveller");
  console.log("Making Request To Kafka...");
  kafka.make_request("get_message_traveller", body, function(err, results) {
    console.log("<<Kafka Response Recieved>>");
    if (err) {
      console.log("Fetch Error");
      res.status(400).json({
        success: false,
        err
      });
    } else {
      console.log("Fetch Successfull", results);
      res.status(200).json({
        success: true,
        messages: results
      });
    }
  });
});

router.get("/getMessageOwner", (req, res, next) => {
  var body = {
    email: req.query.email
  };

  console.log("Inside API Request: /getMessageOwner");
  console.log("Making Request To Kafka...");
  kafka.make_request("get_message_owner", body, function(err, results) {
    console.log("<<Kafka Response Recieved>>");
    if (err) {
      console.log("Fetch Error");
      res.status(400).json({
        success: false,
        err
      });
    } else {
      console.log("Fetch Successfull");
      res.status(200).json({
        success: true,
        messages: results
        
      });
    }
  });

});

router.post("/setOwnerReply", (req, res, next) => {
  console.log("Inside API Request: /setOwnerReply");
  console.log("Making Request To Kafka...");
  kafka.make_request("set_owner_reply", req.body, function(err, results) {
    console.log("<<Kafka Response Recieved>>");
    if (err) {
      console.log("Fetch Error");
      res.status(400).json({
        success: false,
        err
      });
    } else {
      console.log("Fetch Successfull");
      res.status(200).json({
        success: true,
        message: results
        
      });
    }
  });

});

router.get("/getTravellerBookings", (req, res, next) => {
  var body = {
    email: req.query.email
  };
  console.log("Inside API Request: /getTravellerBookings");
  console.log("Making Request To Kafka...");
  kafka.make_request("get_traveller_bookings", body, function(err, results) {
    console.log("<<Kafka Response Recieved>>");
    if (err) {
      console.log("Fetch Error");
      res.status(400).json({
        success: false,
        err
      });
    } else {
      console.log("Fetch Successfull");
      res.status(200).json({
        success: true,
        bookings: results
        
      });
    }
  });
});


router.get("/getOwnerBookings", (req, res, next) => {
  var body = {
    email: req.query.email
  };
  console.log("Inside API Request: /getOwnerBookings");
  console.log("Making Request To Kafka...");
  kafka.make_request("get_owner_bookings", body, function(err, results) {
    console.log("<<Kafka Response Recieved>>");
    if (err) {
      console.log("Fetch Error");
      res.status(400).json({
        success: false,
        err
      });
    } else {
      console.log("Fetch Successfull");
      res.status(200).json({
        success: true,
        bookings: results
        
      });
    }
  });
});




router.get("/getBooking", (req, res, next) => {
  var body = {
    bid: req.query.bid
  };
  console.log("Inside API Request: /getBooking");
  console.log("Making Request To Kafka...");
  kafka.make_request("get_booking", body, function(err, results) {
    console.log("<<Kafka Response Recieved>>");
    if (err) {
      console.log("Fetch Error");
      res.status(400).json({
        success: false,
        err
      });
    } else {
      console.log("Fetch Successfull");
      res.status(200).json({
        success: true,
        booking: results
        
      });
    }
  });
});



router.get("/getUserInformation", (req, res, next) => {
  var body = {
    email: req.query.email
  };
  console.log("Inside API Request: /getUserInformation");
  console.log("Making Request To Kafka...");
  kafka.make_request("get_user_information", body, function(err, results) {
    console.log("<<Kafka Response Recieved>>");
    if (err) {
      console.log("Fetch Error");
      res.status(400).json({
        success: false,
        err
      });
    } else {
      console.log("Fetch Successfull");
      res.status(200).json({
        success: true,
        user: results
        
      });
    }
  });
});




router.post("/setUserInformation", (req, res, next) => {
  console.log("Inside API Request: /setUserInformation");
  console.log("Making Request To Kafka...");
  kafka.make_request("set_user_information", req.body, function(err, results) {
    console.log("<<Kafka Response Recieved>>");
    if (err) {
      console.log("Fetch Error");
      res.status(400).json({
        success: false,
        err
      });
    } else {
      console.log("Fetch Successfull");
      res.status(200).json({
        success: true,
        user: results
        
      });
    }
  });
});




module.exports = router;
