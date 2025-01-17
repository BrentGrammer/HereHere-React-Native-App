const { Conversation } = require('../models/Conversation');

const getConversations = (userId) => {
  return Conversation.find({ 
    participants: {
      $all: [{ $elemMatch: {$eq: userId} }] 
    }
  });
};

const updateConversations = (message) => {
  const { from, to, createdAt, text } = message;
  return Conversation.findOneAndUpdate({ 
    participants: { 
        $all: [
          { $elemMatch: { $eq: from } }, 
          { $elemMatch: { $eq: to } }
        ] 
      } 
    },    
    { $set: { 
        participants: [from, to], 
        lastUpdated: createdAt, 
        lastUpdateMessageText: text,
        lastUpdateMessageId: message.id,
        lastUserToSendMessage: from
      } },  
    { upsert: true, 'new': true });
};  


module.exports = {
  getConversations,
  updateConversations
}

