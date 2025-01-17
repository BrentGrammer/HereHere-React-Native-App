const generatePasswordHash = require('../util/generatePasswordHash');
const { User } = require('../models/User');
const { Conversation } = require('../models/Conversation');
const { Message } = require('../models/Message');
const { PrivateMessage } = require('../models/PrivateMessage');

const createUser = async (userData) => {
  const { password } = userData;

  return generatePasswordHash(password)
    .then((hash) => {
      const user = new User({
        ...userData,
        password: hash
      });
      return user.save();
    });
};

const getUser = (user) => {
  const fields = user.email ? { email: user.email } : { _id: user.userId }; 
  return User.findOne(fields)
    .then(result => { return result; });
};

const getLimitedUserInfo = (userId) => {
  return User.findOne({ _id: userId })
    .select({ password: false, token: false, email: false });
};

const deleteUserAccount = async (userId) => {
  return User.findOneAndDelete({ _id: userId })
    .then(res => {
      return Message.deleteMany({ "user._id": userId });
    })
    .then(res => {
      // return Conversation.deleteMany({ 
      //   // changed this line to try to get the conversations deleted
      //   participants: { $elemMatch:  userId }
      //     //   { students: { $elemMatch: { school: 102 } } }
      // });
    })
    .then(res => {
      return PrivateMessage.deleteMany({ from: userId });
    })
    .then(res => {
      return PrivateMessage.deleteMany({ to: userId });
    });
};

module.exports = {
  createUser,
  getUser,
  getLimitedUserInfo,
  deleteUserAccount
};