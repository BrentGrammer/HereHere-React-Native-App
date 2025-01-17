const { getLimitedUserInfo } = require("../queries/userQueries");

const addUserInfoToConversation = async (convo, userId) => {
  const otherUserId = convo.participants.find(participantId => participantId !== userId );
  const conversationWith = await getLimitedUserInfo(otherUserId);

  return { ...convo._doc, conversationWith };
};

module.exports = { addUserInfoToConversation }