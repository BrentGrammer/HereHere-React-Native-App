var express = require('express');
var router = express.Router();
const {
  getMessagesForConversation 
} = require("../queries/messageQueries");
const auth = require('../middleware/auth');

const messagesController = () => {

  router.get('/messages/private/:conversationId', auth, (req, res, next) => {
    const { conversationId } = req.params;
    getMessagesForConversation(conversationId)
      .then(messages => {      
        res.send({success: true, data: messages }); 
      })
      .catch(err => { 
        console.log('Error getting private messages for userId', err);
        res.send({ success: false, message: 'There was an error getting messages.'});
      });
  });

  return router;
};

module.exports = messagesController;