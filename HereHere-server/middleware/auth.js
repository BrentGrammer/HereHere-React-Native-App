const jwt = require('jsonwebtoken');
const { User } = require('../models/User');
const keys = require('../config/keys');

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, keys.JWT_SECRET);

    // the user id is stored on the token
    const user = await User.findOne({ _id: decoded._id, token: token });

    if (!user) {
      throw new Error();
    }
    // add the user and token to the req object so route handler can access it:
    req.token = token; 
    req.user = user
    next();
  } catch (e) {
    res.status(401).send({ success: false, message: 'Please authenticate.' });
  }
};

module.exports = auth;