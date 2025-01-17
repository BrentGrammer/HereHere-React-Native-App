var express = require('express');
var router = express.Router();
const { getLimitedUserInfo } = require("../queries/userQueries");
const { getConversations } = require("../queries/conversationQueries");
const auth = require('../middleware/auth');

const conversationsController = () => {
  
  const addUserInfoToConversations = async (conversations, userId) => {
    const formatted = await Promise.all(conversations.map(async (convo) => {
      const otherUserId = convo.participants.find(participantId => participantId !== userId );
      const conversationWith = await getLimitedUserInfo(otherUserId);

      return { ...convo._doc, conversationWith };
    }));
    return formatted; 
  };
  
  router.get('/conversations/:userId', auth, (req, res, next) => {
    const { userId } = req.params;
    getConversations(userId)
      .then(async (conversations) => {
        return addUserInfoToConversations(conversations, userId);   
      })
      .then((conversationsWithUserInfoAdded) => {
        console.log('conversations with userinfo added in controller: ', conversationsWithUserInfoAdded)
        const sortedByDate = conversationsWithUserInfoAdded.sort((a, b) => {
          return new Date(b.lastUpdated) - new Date(a.lastUpdated);
        });
        res.send({ success: true, data: sortedByDate });
      })
      .catch(err => {
        console.log('Error getting conversations', err);
        res.send({ success: false, message: 'Error getting conversations.'});
      });
  });

  return router;
};

module.exports = conversationsController;