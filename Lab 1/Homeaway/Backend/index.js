/* -----------------------------------------------------------------------------------------------------------
                                                Initializations             
-----------------------------------------------------------------------------------------------------------*/
var mysql = require("mysql");
var bcrypt = require("bcrypt");
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var cors = require("cors");
var session = require("express-session");
var multer = require("multer");
var mkdirp = require("mkdirp");
var moment = require('moment');

var storage = multer.diskStorage({
  destination: function(req, file, callback) {
    const dir = "uploads/" + req.body.email + "/";
    mkdirp(dir, err => callback(null, dir));
  },
  filename: function(req, file, callback) {
    var ext = file.originalname.split(".").pop();

    callback(null, file.fieldname + "_" + Date.now() + "." + ext);
  }
});
var upload = multer({ storage: storage });

app.use(cors({ origin: "http://localhost:3000", credentials: true }));

//Express Sessions
app.use(
  session({
    name: "cookie",
    secret: "TobeOrNottobethatisthequestion",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60 * 60 * 1000, httpOnly: false, path: "/" }
  })
);

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

var pool = mysql.createPool({
  connectionLimit: 100,
  port: "3306",
  host: "localhost",
  user: "root",
  password: "password",
  database: "homeaway"
});

app.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,HEAD,OPTIONS,POST,PUT,DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
  );
  res.setHeader("Cache-Control", "no-cache");
  next();
});

//MySql DB Connections
// var con = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "password",
//   database: "homeaway"
// });



var server = app.listen(8000, function() {
  console.log("Server listening on port 8000");
});
/* -----------------------------------------------------------------------------------------------------------
                                                     QUERIES             
-----------------------------------------------------------------------------------------------------------*/

var createNewLightUserObject = (email, password, fname, lname) => {
  return new Promise(function(resolve, reject) {
    const saltRounds = 12;
    bcrypt.genSalt(saltRounds, function(err, salt) {
      bcrypt.hash(password, salt, function(err, hash) {
        if (!err) {
          var newUser = {
            ufname: fname,
            ulname: lname,
            uemail: email,
            upasswordhash: hash
          };
          resolve(newUser);
        } else {
          reject(err);
        }
      });
    });
  });
};

var isPresentInDatabase = email => {
  return new Promise(function(resolve, reject) {
    pool.getConnection(function(err, con) {
      if (err) {
        res.writeHead(400, {
          "Content-Type": "text/plain"
        });
        res.end("Could Not Get Connection Object");
      } else {
        con.query(
          "SELECT uemail,upasswordhash FROM User_Table WHERE uemail = ?",
          email,
          function(err, rows) {
            if (!err) {
              resolve(rows);
            } else {
              reject(err);
          }
          
        });
      }
      con.release();
    });
  });
};

var addNewLightUserObjectToDatabase = newUser => {
  return new Promise(function(resolve, reject) {
    pool.getConnection(function(err, con) {
      if (err) {
        res.writeHead(400, {
          "Content-Type": "text/plain"
        });
        res.end("Could Not Get Connection Object");
      } else {
        con.query("INSERT INTO User_Table SET ?", newUser, function(
          err,
          result
        ) {
          if (!err) {
            resolve(result);
          } else {
            reject(err);
          }
          
        });
      }
      con.release();
    });
  });
};

var updateUserObjectToDatabase = (newUser, email) => {
  return new Promise(function(resolve, reject) {
    pool.getConnection(function(err, con) {
      if (err) {
        res.writeHead(400, {
          "Content-Type": "text/plain"
        });
        res.end("Could Not Get Connection Object");
      } else {
        con.query(
          "UPDATE User_Table SET ? WHERE uemail = '" + email + "'",
          newUser,
          function(err, result) {
            if (!err) {
              resolve(result);
            } else {
              reject(err);
          }
          
        });
      }
      con.release();
    });
  });
};

var addNewPropertyToDatabase = newProperty => {
  return new Promise(function(resolve, reject) {
    pool.getConnection(function(err, con) {
      if (err) {
        res.writeHead(400, {
          "Content-Type": "text/plain"
        });
        res.end("Could Not Get Connection Object");
      } else {
        con.query("INSERT INTO Property_Table SET ?", newProperty, function(
          err,
          result
        ) {
          if (!err) {
            resolve(result);
          } else {
            reject(err);
          }
          
        });
      }
      con.release();
    });
  });
};

var comparePasswords = (password, hash) => {
  return new Promise(function(resolve, reject) {
    bcrypt.compare(password, hash, function(err, res) {
      if (!err) {
        resolve(res);
      } else {
        reject(err);
      }
    });
  });
};

var getUserInformationFromDatabase = email => {
  return new Promise(function(resolve, reject) {
    pool.getConnection(function(err, con) {
      if (err) {
        res.writeHead(400, {
          "Content-Type": "text/plain"
        });
        res.end("Could Not Get Connection Object");
      } else {
        con.query("SELECT * FROM User_Table WHERE uemail = ?", email, function(
          err,
          rows
        ) {
          if (!err) {
            resolve(rows);
          } else {
            reject(err);
          }
          
        });
      }
      con.release();
    });
  });
};

var getAllPropertyFromDatabase = email => {
  return new Promise(function(resolve, reject) {
    pool.getConnection(function(err, con) {
      if (err) {
        res.writeHead(400, {
          "Content-Type": "text/plain"
        });
        res.end("Could Not Get Connection Object");
      } else {
        con.query(
          "SELECT * FROM Property_Table WHERE uemail = ?",
          email,
          function(err, rows) {
            if (!err) {
              resolve(rows);
            } else {
              reject(err);
            }
            
          });
        }
        con.release();
    });
  });
};

var getPropertyInformation = pid => {
  return new Promise(function(resolve, reject) {
    pool.getConnection(function(err, con) {
      if (err) {
        res.writeHead(400, {
          "Content-Type": "text/plain"
        });
        res.end("Could Not Get Connection Object");
      } else {
        con.query("SELECT * FROM Property_Table WHERE pid = ?", pid, function(
          err,
          rows
        ) {
          if (!err) {
            resolve(rows);
          } else {
            reject(err);
          }
          
        });
      }
      con.release();
    });
  });
};

var getAllPropertiesWhere = (place, sleeps) => {
  return new Promise(function(resolve, reject) {
    pool.getConnection(function(err, con) {
      if (err) {
      console.log(err)
      } else {
        var sql =
          "SELECT * FROM Property_Table WHERE (city = ? OR state = ? OR country = ?) AND accomodates>= ?";
        con.query(sql, [place, place, place, sleeps], function(err, rows) {
          if (!err) {
            resolve(rows);
            console.log(rows)

          } else {
            reject(err);
          }
          
        });
      }
      con.release();
    });
  });
};

var addNewBookingtoDatabase = booking => {
  return new Promise(function(resolve, reject) {
    pool.getConnection(function(err, con) {
      if (err) {
        res.writeHead(400, {
          "Content-Type": "text/plain"
        });
        res.end("Could Not Get Connection Object");
      } else {
        con.query("INSERT INTO Booking_Table SET ?", booking, function(
          err,
          result
        ) {
          if (!err) {
            resolve(result);
          } else {
            reject(err);
          }
        });
      }
    });
  });
};

var getAllBookingsOfCurrentProperty = pid => {
  return new Promise(function(resolve, reject) {
    pool.getConnection(function(err, con) {
      if (err) {
        res.writeHead(400, {
          "Content-Type": "text/plain"
        });
        res.end("Could Not Get Connection Object");
      } else {
        con.query("SELECT * FROM Booking_Table WHERE pid = ?", pid, function(
          err,
          rows
        ) {
          if (!err) {
            resolve(rows);
          } else {
            reject(err);
          }
          
        });
      }
      con.release();
    });
  });
};

var getAllTripsOfUser = email => {
  return new Promise(function(resolve, reject) {
    pool.getConnection(function(err, con) {
      if (err) {
        res.writeHead(400, {
          "Content-Type": "text/plain"
        });
        res.end("Could Not Get Connection Object");
      } else {
        con.query(
          "SELECT * FROM Booking_Table WHERE uemail = ?",
          email,
          function(err, rows) {
            if (!err) {
              resolve(rows);
            } else {
              reject(err);
            }
            
          });
        }
        con.release();
    });
  });
};

var getAllBookingsOfOwnersProperties = email => {
  return new Promise(function(resolve, reject) {
    pool.getConnection(function(err, con) {
      if (err) {
        res.writeHead(400, {
          "Content-Type": "text/plain"
        });
        res.end("Could Not Get Connection Object");
      } else {
        con.query(
          "SELECT * FROM Booking_Table WHERE owneremail = ?",
          email,
          function(err, rows) {
            if (!err) {
              resolve(rows);
            } else {
              reject(err);
            }
            
          });
        }
        con.release();
    });
  });
};

/* -----------------------------------------------------------------------------------------------------------
                                                     Routes             
-----------------------------------------------------------------------------------------------------------*/

app.post("/addUserLight", function(req, res) {
  const email = req.body.email;
  const password = req.body.password;
  const fname = req.body.fname;
  const lname = req.body.lname;

  isPresentInDatabase(email)
    .then(rows => {
      if (rows.length) {
        //If User Exists
        console.log("User Already Exists");
        res.status(200).json({
          success: false,
          error: "This User Already Exists"
        });
      } else {
        createNewLightUserObject(email, password, fname, lname)
          .then(newUser => {
            addNewLightUserObjectToDatabase(newUser)
              .then(result => {
                console.log("Result" + result);
                res.cookie("email", email, {
                  maxAge: 60 * 60 * 1000,
                  httpOnly: false,
                  path: "/"
                });
                req.session.user = email;
                res.status(200).json({
                  success: true,
                  email
                });
              })
              .catch(err => {
                console.log(
                  "An Error was Encountered While Adding Light User Object to Database Error:" +
                    err
                );
                res.status(400).json({
                  success: false,
                  err
                });
              });
          })
          .catch(err => {
            console.log(
              "An Error was Encountered While Creating Light User Object. Error:" +
                err
            );
            res.status(400).json({
              success: false,
              err
            });
          });
      }
    })
    .catch(err => {
      console.log(
        "An Error was Encountered While Checking if User is Present in Database. Error:" +
          err
      );
      res.status(400).json({
        success: false,
        err
      });
    });
});

app.post("/addUserHeavy", function(req, res) {
  const fname = req.body.fname;
  const lname = req.body.lname;
  const email = req.body.email;
  const about = req.body.about;
  const phone = req.body.phonenumber;
  const gender = req.body.gender;
  const mycity = req.body.mycity;
  const school = req.body.school;
  const aboutme = req.body.aboutme;
  const company = req.body.company;
  const hometown = req.body.hometown;
  const languages = req.body.languages;

  var User = {
    ufname: fname,
    ulname: lname,
    uabout: about,
    ucity: mycity,
    ucompany: company,
    uschool: school,
    uhometown: hometown,
    ulanguages: languages,
    ugender: gender,
    uphone: phone,
    uabout: aboutme
  };

  updateUserObjectToDatabase(User, email)
    .then(result => {
      res.status(200).json({
        success: true,
        result
      });
    })
    .catch(error => {
      console.log(error);
      res.status(400).json({
        success: true,
        error
      });
    });
});

app.post("/login", function(req, res) {
  const email = req.body.email;
  const password = req.body.password;
  isPresentInDatabase(email)
    .then(rows => {
      if (rows.length) {
        comparePasswords(password, rows[0].upasswordhash)
          .then(resp => {
            if (resp) {
              req.session.user = email;
              res.cookie("email", email, {
                maxAge: 60 * 60 * 1000,
                httpOnly: false,
                path: "/"
              });

              res.status(200).json({
                success: true,
                email
              });
              console.log(
                "Logged in Sucessfully with "+email
              );
            } else {
              res.status(200).json({
                success: false,
                error: "Passwords Dont Match!"
              });
            }
          })
          .catch(err => {
            res.status(400).json({
              success: false,
              err
            });
          });
      } else {
        res.status(200).json({
          success: false,
          error: "This User does not exist"
        });
      }
    })
    .catch(err => {
      console.log(
        "An Error was Encountered While Checking if User is Present in Database. Error:" +
          err
      );
      res.status(400).json({
        success: false,
        err
      });
    });
});

app.post("/getUserInfo", function(req, res) {
  const email = req.body.email;
  getUserInformationFromDatabase(email)
    .then(rows => {
      if (rows.length) {
        let data = {
          lname: rows[0].ulname,
          fname: rows[0].ufname,
          membersince: "2018",
          aboutme: rows[0].uabout,
          mycity: rows[0].ucity,
          company: rows[0].ucompany,
          school: rows[0].uschool,
          hometown: rows[0].uhometown,
          languages: rows[0].ulanguages,
          gender: rows[0].ugender,
          phonenumber: rows[0].uphone
        };
        res.status(200).json({
          success: true,
          data
        });
      }
    })
    .catch(err => {
      res.status(200).json({
        success: false,
        error
      });
    });
});

app.post("/addProperty", upload.array("photos"), function(req, res, next) {
  const adl1 = req.body.adl1;
  const adl2 = req.body.adl2;
  const city = req.body.city;
  const state = req.body.state;
  const zip = req.body.zip;
  const country = req.body.country;
  const phone = req.body.phone;
  const headline = req.body.headline;
  const description = req.body.description;
  const type = req.body.placetype;
  const bedrooms = req.body.bedrooms;
  const bathrooms = req.body.bathrooms;
  const accomodates = req.body.accomdates;
  const currency = req.body.currency;
  const baserent = req.body.pricepernight;
  const minimumstay = req.body.minimumstay;
  const availablefrom = req.body.startDate;
  const availableto = req.body.endDate;
  const email = req.body.email;

  let filenamearray = [];
  req.files.forEach(file => {
    filenamearray.push(file.filename);
  });

  let photos = filenamearray.join();

  var data = {
    adl1: adl1,
    adl2: adl2,
    city: city,
    state: state,
    zip: zip,
    country: country,
    phone: phone,
    headline: headline,
    description: description,
    type: type,
    bedrooms: bedrooms,
    bathrooms: bathrooms,
    accomodates: accomodates,
    currency: currency,
    baserent: baserent,
    minimumstay: minimumstay,
    availablefrom: availablefrom,
    availableto: availableto,
    photos: photos,
    uemail: email
  };

  addNewPropertyToDatabase(data).then(result => {
    res.status(200).json({
      success: true,
      result
    });
  });
});

app.post("/getAllPropertiesOfUser", function(req, res) {
  const email = req.body.email;
  getAllPropertyFromDatabase(email)
    .then(rows => {
      console.log(rows)
      res.status(200).json({
        success: true,
        rows
      });
    })
    .catch(err => {
      res.status(200).json({
        success: false,
        err
      });
    });
});

app.get("/uploads/:email/:photo", function(req, res, next) {
  var em = req.params.email;
  var options = {
    root: __dirname + "/uploads/" + em,
    dotfiles: "deny",
    headers: {
      "x-timestamp": Date.now(),
      "x-sent": true
    }
  };

  var fileName = req.params.photo;
  res.sendFile(fileName, options, function(err) {
    if (err) {
      next(err);
    } else {
      console.log("Sent:", fileName);
    }
  });
});

app.post("/getPropertyInformation", function(req, res) {
  const pid = req.body.pid;
  getPropertyInformation(pid)
    .then(rows => {
      var prop = rows[0];
      res.status(200).json({
        success: true,
        prop
      });
    })
    .catch(err => {
      res.status(200).json({
        success: false,
        err
      });
    });
});

app.post("/getAllPropertiesWhere", function(req, res) {

  console.log("Search Triggered");

  var place = req.body.where;
  var people = req.body.people;
  var startDate = req.body.startDate;
  var endDate = req.body.endDate;
  getAllPropertiesWhere(place, people)
    .then(rows => {
      console.log(rows)
      let filteredRows =[];
        
      rows.forEach(row => {
      
        let avf =moment(row.availablefrom);
        let avt =moment(row.availableto);
         if((moment(endDate).diff(avf, "days")>=0) && (moment(endDate).diff(avt, "days")<=0)&&(moment(startDate).diff(avf, "days")>=0)){
          filteredRows.push(row)
         }

      });
      console.log(filteredRows);

      res.status(200).json({
        success: true,
        filteredRows
      });
    })
    .catch(err => {
      console.log(err);

      res.status(200).json({
        success: false,
        err
      });
    });
});

app.post("/addBooking", function(req, res) {
  let pid = req.body.pid;
  let email = req.body.travellerEmail;
  let startDate = req.body.startDate;
  let endDate = req.body.endDate;
  let cost = req.body.cost;
  let currency = req.body.currency;
  let city = req.body.city;
  let owneremail = req.body.owneremail;

  var booking = {
    pid: pid,
    uemail: email,
    from: startDate,
    to: endDate,
    cost: cost,
    currency: currency,
    city: city,
    owneremail: owneremail
  };


  addNewBookingtoDatabase(booking).then(result => {
    console.log("Property Added SucessFully");
    res.status(200).json({
      success: true
    });
  });
});

app.post("/getAllBookingsOfCurrentProperty", function(req, res) {
  let pid = req.body.pid;
  getAllBookingsOfCurrentProperty(pid).then(rows => {
    res.status(200).json({
      success: true,
      rows
    });
    console.log(rows);
  });
});

app.post("/getAllTripsOfUser", function(req, res) {
  let email = req.body.email;

  getAllTripsOfUser(email).then(rows => {
    res.status(200).json({
      success: true,
      rows
    });
  });
});

app.post("/getAllBookingsOfOwnersProperties", function(req, res) {
  let email = req.body.email;

  getAllBookingsOfOwnersProperties(email).then(rows => {
    res.status(200).json({
      success: true,
      rows
    });
  });
});


