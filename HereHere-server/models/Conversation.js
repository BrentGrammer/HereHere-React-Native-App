const mongoose = require('mongoose');
const { Schema } = mongoose;

const conversationSchema = new Schema({
  participants: { type: [ String ], required: true },
  lastUpdated: { type: Date },
  lastUpdateMessageText: { type: String },
  lastUpdateMessageId: { type: String },
  lastUserToSendMessage:  { type: String },
});

const Conversation = mongoose.model('conversations', conversationSchema);

module.exports = { Conversation };