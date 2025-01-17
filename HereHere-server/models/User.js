const mongoose = require('mongoose');
const { Schema } = mongoose;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const keys = require('../config/keys');

const userSchema = new Schema({ 
  username: { type: String, default: 'User', required: true },  
  password: { type: String, required: true, minlength: 1 },
  email: { type: String, required: true, minlength: 1 },
  avatarUrl: { type: String, default: 'https://s3.amazonaws.com/my-s3-bucket/images/generic/avatar.jpg' },
  city: { type: String, required: false, default: "Denver,Colorado,United States" },
  tagline: { type: String, maxlength: 50 },
  summary: { type: String, maxlength: 400 },
  token: { type: String }
});

userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const _id = user._id.toString();

  const token = await jwt.sign(
    { _id }, 
    keys.JWT_SECRET, 
    { expiresIn: '7 days' }
  ).toString();

  user.token = token;
  return user.save()
    .then(() => token);
};

userSchema.statics.findByCredentials = async function (email, password) {
  const User = this; 
  const user = await User.findOne({ email });
  
  if (!user) throw new Error('no user found');

  const passwordMatches = await bcrypt.compare(password, user.password);
  if (passwordMatches) {
    return user;
  } else {
    throw new Error('invalid Credentials')
  }
};

const User = mongoose.model('users', userSchema);
module.exports = { User };