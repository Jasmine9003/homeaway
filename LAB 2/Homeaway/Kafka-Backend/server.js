var connection = new require("./kafka/Connection");
var getUserProperties = require("./services/getUserProperties");
var getProperty = require("./services/getProperty");
var getPropertiesWhere = require("./services/getPropertiesWhere");
var createNewBooking = require("./services/createNewBooking");
var createNewProperty = require("./services/createNewProperty");
var createNewMessage = require("./services/createNewMessage");
var getMessageOwner = require("./services/getMessageOwner");
var getMessageTraveller = require("./services/getMessageTraveller");
var setOwnerReply = require("./services/setOwnerReply");
var getTravellerBookings = require("./services/getTravellerBookings");
var getOwnerBookings = require("./services/getOwnerBookings");
var getBookings = require("./services/getBookings");
var getUserInformation = require("./services/getUserInformation");
var setUserInformation = require("./services/setUserInformation");
const mongoose = require("mongoose");
mongoose.Promise = require('bluebird');

//Database Connection
mongoose.connect(
  "mongodb://admin:abc123@ds129946.mlab.com:29946/homeaway",  {
    useCreateIndex: true,
    useNewUrlParser: true,
    poolSize:500
  }
).then(
 
  () => { console.log("Sucessfully Connected to MogoDB");},
   
  err => { console.log("Error Connecting to MogoDB" );}
   
  );


function handleTopicRequest(topic_name, fname) {
  var consumer = connection.getConsumer(topic_name);
  var producer = connection.getProducer();
  console.log("Topic Request Handler latched to >> ", topic_name);
  consumer.on("message", function(message) {
    console.log("\n\nMessage received for >> " + topic_name);
    var data = JSON.parse(message.value);
    fname.handle_request(data.data, function(err, res) {
      console.log("Request has been handled by Kafka Server, Response is being Forwarded");
      var payloads = [
        {
          topic: data.replyTo,
          messages: JSON.stringify({
            correlationId: data.correlationId,
            data: res
          }),
          partition: 0
        }
      ];
      producer.send(payloads, function(err, data) {
        console.log(data);
      });
      return;
    });
  });
}
// Add your TOPICs here
//first argument is topic name
//second argument is a function that will handle this topic request
handleTopicRequest("get_user_property", getUserProperties);
handleTopicRequest("get_property", getProperty);
handleTopicRequest("get_properties_where", getPropertiesWhere);
handleTopicRequest("create_new_booking", createNewBooking);
handleTopicRequest("create_new_property", createNewProperty);
handleTopicRequest("create_new_message", createNewMessage);
handleTopicRequest("get_message_owner", getMessageOwner);
handleTopicRequest("get_message_traveller", getMessageTraveller);
handleTopicRequest("set_owner_reply", setOwnerReply);
handleTopicRequest("get_traveller_bookings", getTravellerBookings);
handleTopicRequest("get_owner_bookings", getOwnerBookings);
handleTopicRequest("get_booking", getBookings);
handleTopicRequest("get_user_information", getUserInformation);
handleTopicRequest("set_user_information", setUserInformation);
