const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const schema = require('./schema/schema');
const graphqlHTTP = require('express-graphql');
const app = express();
var cors = require("cors");

app.use(cors({ origin: "http://localhost:3000", credentials: true }));
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

mongoose
  .connect(
    "mongodb://admin:abc123@ds129946.mlab.com:29946/homeaway",
    {
      useCreateIndex: true,
      useNewUrlParser: true,
      poolSize: 500
    }
  )
  .then(
    () => {
      console.log("Sucessfully Connected to MogoDB");
    },

    err => {
      console.log("Error Connecting to MogoDB");
    }
  );

mongoose.Promise = global.Promise;
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
require("./auth/auth");
const routes = require("./api/routes");



app.use("/", routes);
// app.use("/graphql", graphqlHTTP({
//   schema,
//   graphiql: true
// }));

app.use("/graphql",passport.authenticate("jwt", { session: false }), graphqlHTTP({
  schema,
  graphiql: true
}));


//Handle errors
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({ error: err });
});

app.listen(8000, () => {
  console.log("Server Started and Listening on Port 8000");
});



