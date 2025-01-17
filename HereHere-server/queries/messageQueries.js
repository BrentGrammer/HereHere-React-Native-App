const uuid = require("uuidv4");
const moment = require("moment");
const { Message } = require("../models/Message");
const { PrivateMessage } = require("../models/PrivateMessage");

const storeMessage = async (messageData) => {
  let message = null;
  const createdAt = new Date().getTime();
  if (messageData.to) {
    const { to, from, text } = messageData;
    message = new PrivateMessage({
      to,
      from,
      text,
      createdAt,
      key: uuid(),
    });
  } else {
    const { place, city, user, text } = messageData;
    message = new Message({
      place,
      user,
      city,
      text,
      createdAt,
      key: uuid(), // for FlatList in react-native rendering - justuse uniq id sent back
    });
  }
  if (!message) {
    return null;
  }
  return message.save();
};

const getPlaceMessages = (placeId) => {
  const oneMonthAgo = new Date(moment().subtract(30, "days").format());

  return Message.find({ "place.placeId": placeId, createdAt: { $gte: oneMonthAgo } })
    .sort({ createdAt: 1 })
    .limit(50);
};

const getMessagesForConversation = (conversationId) => {
  return PrivateMessage.find({
    conversationId,
  }).sort({ createdAt: "asc" });
};

const getLatestActivity = (city = "World") => {
  const oneMonthAgo = new Date(moment().subtract(30, "days").format());
  const searchParams = { createdAt: { $gte: oneMonthAgo } };
  if (city !== "World") searchParams.city = city;
  console.log({ searchParams })
  return Message.find(searchParams).sort({ createdAt: 1 }).limit(50);
};

const updateMessage = (messageId, fields) => {
  return PrivateMessage.findOneAndUpdate(
    { _id: messageId },
    { $set: { ...fields } },
    { new: true }
  );
};

module.exports = {
  storeMessage,
  getPlaceMessages,
  getLatestActivity,
  updateMessage,
  getMessagesForConversation,
};
