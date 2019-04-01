const graphql = require("graphql");
const UserModel = require("../model/usermodel");
const BookingModel = require("../model/bookingmodel");
const PropertyModel = require("../model/propertymodel");
const moment = require("moment");
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLInt,
  GraphQLFloat,
  GraphQLList
} = graphql;

const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    fname: { type: GraphQLString },
    lname: { type: GraphQLString },
    aboutme: { type: GraphQLString },
    city: { type: GraphQLString },
    school: { type: GraphQLString },
    hometown: { type: GraphQLString },
    languages: { type: GraphQLString },
    gender: { type: GraphQLString },
    phone: { type: GraphQLString },
    _id: { type: GraphQLString }
  })
});

const BookingType = new GraphQLObjectType({
  name: "Booking",
  fields: () => ({
    bookingfrom: { type: GraphQLString },
    bookingto: { type: GraphQLString },
    travelleremail: { type: GraphQLString },
    propertyowneremail: { type: GraphQLString },
    propertyid: { type: GraphQLString },
    nights: { type: GraphQLInt },
    cost: { type: GraphQLInt },
    city: { type: GraphQLString },
    currency: { type: GraphQLString },
    propertyname: { type: GraphQLString },
    _id: { type: GraphQLString }
  })
});

const PropertyType = new GraphQLObjectType({
  name: "Property",
  fields: () => ({
    addressline1: { type: GraphQLString },
    addressline2: { type: GraphQLString },
    city: { type: GraphQLString },
    state: { type: GraphQLString },
    zip: { type: GraphQLInt },
    country: { type: GraphQLString },
    phone: { type: GraphQLFloat },
    headline: { type: GraphQLString },
    description: { type: GraphQLString },
    placetype: { type: GraphQLString },
    bedrooms: { type: GraphQLInt },
    bathrooms: { type: GraphQLInt },
    accomodates: { type: GraphQLInt },
    currency: { type: GraphQLString },
    baserent: { type: GraphQLInt },
    minimumstay: { type: GraphQLInt },
    availablefrom: { type: GraphQLString },
    availableto: { type: GraphQLString },
    email: { type: GraphQLString },
    _id: { type: GraphQLString },
    bookings: {
      type: new GraphQLList(BookingType),
      resolve(parent, args) {
        return new Promise((resolve, reject) => {
          BookingModel.find({ propertyid: parent._id }).then(bookings => {
            resolve(bookings);
          });
        });
      }
    }
  })
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    user: {
      type: UserType,
      args: { email: { type: GraphQLString } },
      resolve(parent, args) {
        console.log("Inside GraphQL Resolve for --> User");
        console.log("Args", args);

        return new Promise((resolve, reject) => {
          UserModel.findOne({ email: args.email }).then(user => {
            console.log("Fetch Successful");
            console.log("Response:", user);
            resolve(user);
          });
        });
      }
    },
    property: {
      type: PropertyType,
      args: { id: { type: GraphQLString } },
      resolve(parent, args) {
        return new Promise((resolve, reject) => {
          console.log("Inside GraphQL Resolve for --> Property");
          console.log("Args", args);
          PropertyModel.findOne({ _id: args.id }).then(property => {
            console.log("Fetch Successful");
            console.log("Response:", property);
            resolve(property);
          });
        });
      }
    },
    properties: {
      type: new GraphQLList(PropertyType),
      resolve(parent, args) {
        return new Promise((resolve, reject) => {
          console.log("Inside GraphQL Resolve for --> Properties");
          console.log("Args", args);

          PropertyModel.find({}).then(properties => {
            console.log("Fetch Successful");
            console.log("Response:", properties);
            resolve(properties);
          });
        });
      }
    },
    propertiesWhere: {
      type: new GraphQLList(PropertyType),
      args: {
        startDate: { type: GraphQLString },
        endDate: { type: GraphQLString },
        where: { type: GraphQLString },
        people: { type: GraphQLInt }
      },
      resolve(parent, args) {
        return new Promise((resolve, reject) => {
          console.log("Inside GraphQL Resolve for --> Properties Where");
          console.log("Args", args);

          var startDate = moment(args.startDate, "MM/DD/YYYY").toDate();
          var endDate = moment(args.endDate, "MM/DD/YYYY").toDate();
          var where = args.where;
          var people = args.people;

          console.log(startDate);
          console.log(endDate);

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
            console.log("Fetch Successful");
            console.log("Response:", properties);
            resolve(properties);
          });
        });
      }
    },
    propertiesOfOwner: {
      type: new GraphQLList(PropertyType),
      args: {
        email: { type: GraphQLString }
      },
      resolve(parent, args) {
        return new Promise((resolve, reject) => {
          console.log("Inside GraphQL Resolve for --> Properties Of Owner");
          console.log("Args", args);

          PropertyModel.find({ email: args.email }).then(properties => {
            console.log("Fetch Successful");
            console.log("Response:", properties);
            resolve(properties);
          });
        });
      }
    },
    travellerBookings: {
      type: new GraphQLList(BookingType),
      args: {
        email: { type: GraphQLString }
      },
      resolve(parent, args) {
        return new Promise((resolve, reject) => {
          console.log("Inside GraphQL Resolve for --> Traveller Bookings");
          console.log("Args", args);

          BookingModel.find({ travelleremail: args.email }).then(bookings => {
            console.log("Fetch Successful");
            console.log("Response:", bookings);
            resolve(bookings);
          });
        });
      }
    },
    ownerBookings: {
      type: new GraphQLList(BookingType),
      args: {
        email: { type: GraphQLString }
      },
      resolve(parent, args) {
        return new Promise((resolve, reject) => {
          console.log("Inside GraphQL Resolve for --> Owner Bookings");
          console.log("Args", args);

          BookingModel.find({ propertyowneremail: args.email }).then(
            bookings => {
              console.log("Fetch Successful");
              console.log("Response:", bookings);
              resolve(bookings);
            }
          );
        });
      }
    },
    booking: {
      type: new GraphQLList(BookingType),
      args: {
        id: { type: GraphQLString }
      },
      resolve(parent, args) {
        return new Promise((resolve, reject) => {
          console.log("Inside GraphQL Resolve for --> Booking");
          console.log("Args", args);

          BookingModel.find({ _id: args.id }).then(booking => {
            console.log("Fetch Successful");
            console.log("Response:", booking);
            resolve(booking);
          });
        });
      }
    }
  }
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addBooking: {
      type: BookingType,
      args: {
        bookingfrom: { type: GraphQLString },
        bookingto: { type: GraphQLString },
        travelleremail: { type: GraphQLString },
        propertyowneremail: { type: GraphQLString },
        propertyid: { type: GraphQLString },
        nights: { type: GraphQLInt },
        cost: { type: GraphQLInt },
        city: { type: GraphQLString },
        currency: { type: GraphQLString },
        propertyname: { type: GraphQLString }
      },
      resolve(parent, args) {
        var startDate = new Date(Number(args.bookingfrom));
        var endDate = new Date(Number(args.bookingto));

        return new Promise((resolve, reject) => {
          console.log("Inside GraphQL Mutation Resolve  for --> Booking");
          console.log("Args", args);

          BookingModel.create({
            bookingfrom: startDate,
            bookingto: endDate,
            travelleremail: args.travelleremail,
            propertyowneremail: args.propertyowneremail,
            propertyid: args.propertyid,
            nights: args.nights,
            cost: args.cost,
            currency: args.currency,
            city: args.city,
            propertyname: args.propertyname
          }).then(book => {
            console.log("Fetch Successful");
            console.log("Response:", book);
            resolve(book);
          });
        });
      }
    },
    updateUser: {
      type: UserType,
      args: {
        email: { type: GraphQLString },
        fname: { type: GraphQLString },
        lname: { type: GraphQLString },
        aboutme: { type: GraphQLString },
        city: { type: GraphQLString },
        school: { type: GraphQLString },
        phone: { type: GraphQLString },
        hometown: { type: GraphQLString },
        languages: { type: GraphQLString },
        gender: { type: GraphQLString },
        propertyname: { type: GraphQLString }
      },
      resolve(parent, args) {
        return new Promise((resolve, reject) => {
          console.log("Inside GraphQL Mutation Resolve  for --> Updating User");
          console.log("Args", args);

          const user = UserModel.findOneAndUpdate(
            { email: args.email },
            {
              fname: args.fname,
              lname: args.lname,
              aboutme: args.aboutme,
              city: args.city,
              school: args.school,
              phone: args.phone,
              hometown: args.hometown,
              languages: args.languages,
              gender: args.gender,
              propertyname: args.propertyname
            }
          ).then(user => {
            console.log("Fetch Successful");
            console.log("Response:", user);
            resolve(user);
          });
        });
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});

import { GraphQLSchema, GraphQLObjectType, GraphQLBoolean } from "graphql";
import { GraphQLUpload } from "graphql-upload";

export const schema = new GraphQLSchema({
  mutation: new GraphQLObjectType({
    name: "Mutation",
    fields: {
      uploadImage: {
        type: GraphQLBoolean,
        args: {
          image: { type: GraphQLUpload }
        },
        async resolve(parent, { image }) {
          const { filename, mimetype, createReadStream } = await image;
          const stream = createReadStream();
          //Store File using any desired library and Add Resolve inside Promise.
          return true;
        }
      }
    }
  })
});
