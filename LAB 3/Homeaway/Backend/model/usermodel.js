const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  fname: {
    type: String,
    required: false
  },
  lname: {
    type: String,
    required: false
  },
  aboutme: {
    type: String,
    required: false
  },
  city: {
    type: String,
    required: false
  },
  school: {
    type: String,
    required: false
  },
  hometown: {
    type: String,
    required: false
  },
  languages: {
    type: String,
    required: false
  },
  gender: {
    type: String,
    required: false
  },
  phone: {
    type: String,
    required: false
  },
  ownermessages:{
    type:[String],
    required:false
  },
  travelmessages:{
    type:[String],
    required:false
  }

  
});

UserSchema.pre("save", async function(next) {
  const user = this;
  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;
  next();
});

UserSchema.methods.isValidPassword = async function(password) {
  const user = this;
  const compare = await bcrypt.compare(password, user.password);
  return compare;
};

const UserModel = mongoose.model("user", UserSchema);

module.exports = UserModel;
