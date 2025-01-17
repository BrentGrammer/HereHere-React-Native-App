const mongoose = require('mongoose');
const { Schema } = mongoose;

const coordsSchema = new Schema({ 
  latitude: { type: Number },
  longitude: { type: Number }
});

const placeSchema = new Schema({
  placeId: { type: String },
  placeName: { type: String },
  coords: { type: coordsSchema },
  address: { type: String, required: true }
});

const userSchema = new Schema({
  username: { type: String },
  avatarUrl: { type: String, default: 'https://s3.amazonaws.com/my-s3-bucket/images/generic/avatar.jpg' },
  tagline: { type: String },
  summary: { type: String }
});

const messageSchema = new Schema({
  place: { type: placeSchema },
  city: { type: String, required: true },
  user: { type: userSchema, required: false },  
  text: { type: String, required: true, maxlength: 200, minlength: 1 },
  createdAt: { type: Date, default: new Date().getTime() },
  key: { type: String, required: true} // used as the key for Flat List render in react-native when retreiving list
});

const Message = mongoose.model('messages', messageSchema);

module.exports = { Message };