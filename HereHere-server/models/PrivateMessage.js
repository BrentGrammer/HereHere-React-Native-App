const mongoose = require('mongoose');
const { Schema } = mongoose;

const privateMessageSchema = new Schema({
  from: { type: String, required: true },  
  to: { type: String, required: true},
  text: { type: String, required: true, maxlength: 400, minlength: 1 },
  createdAt: { type: Date, default: new Date().getTime() },
  conversationId: { type: String },
  seen: { type: Boolean, required: false },
  key: { type: String, required: true} // used as the key for Flat List render in react-native when retreiving list
});

const PrivateMessage = mongoose.model('privateMessages', privateMessageSchema);

module.exports = { PrivateMessage };