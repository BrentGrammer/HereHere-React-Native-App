const express = require('express');
let router = express.Router();
const { s3_getSignedAvatarUrl, s3_deleteObject } = require('../services/aws/aws-s3');
const Query = require('../queries/userQueries');
const { User } = require('../models/User');
const { minLengthValidator } = require('../util/validators');
const { generateUserObjectResponse } = require('../util/generateUserObjectResponse');
const auth = require('../middleware/auth');

const userController = () => {

  router.post('/users/signup', async (req, res, next) => {
    let userExists = false;
    const trimmedEmail = req.body.email.trim();

    try {
      userExists = await User.findOne({ email: trimmedEmail });
      if (userExists) {
        throw new Error('User already Exists');
      } 
      const user = await Query.createUser({ ...req.body, email: trimmedEmail });
      const token = await user.generateAuthToken();
      const userData = generateUserObjectResponse(user, token);

      res.status(201).send({ success: true, data: { user: userData } });
    } catch (e) {
      console.log('error signing up user', e);
      res.status(400).send({ 
        success: false, 
        message: userExists ? 'User already Exists' : 'Error signing up. Please Try Again.' 
      });
    }
  });

  router.post('/users/login', async (req, res, next) => {
    const { email, password } = req.body;
    const trimmedEmail = email.trim();

    const notEmpty = minLengthValidator(trimmedEmail, 1) && minLengthValidator(password, 1);
    if (!notEmpty) {
      res.send({ success: false, message: 'Email or Password is empty.'});
      return;
    } 

    try {
      const user = await User.findByCredentials(trimmedEmail, password);
      const token = await user.generateAuthToken();
      const userData = generateUserObjectResponse(user, token);
      res.send({ 
        success: true, 
        data: { user: userData }
      });
    } catch (e) {
      console.log('error logging in ', e);
      res.status(400).send({ success: false, message: 'There was an Error logging in. Please try again.'});
    }
  });

  router.post('/users/logout', auth, async (req, res) => {
    try {
      // remove the token that matches the token on the logout req:
      req.user.token = '';
      await req.user.save();
  
      res.send({ success: true });
    } catch (e) {
      console.log('error logging out', e)
      res.status(500).send({ success: false });
    }
  });
  
  
  router.post('/users/avatar/get-upload-url', auth, async (req, res, next) => {
    //@TODO check authentication of user before returning link
    // in the body need to send a uuid or token for user and check database
    
    const { userId } = req.body;
    
    s3_getSignedAvatarUrl(userId)
      .then(({ url, filename }) => {
        res.send({ success: true, data: { signedS3Url: url, filename } });
      })
      .catch(err => {
        console.log(err);
        res.send({ success: false, message: "There was an error."})
      });
  });

  router.post('/users/avatar/update', auth, (req, res, next) => {
    const { filename, oldAvatarFilename } = req.body;
    
    const avatarUrl = `https://s3.amazonaws.com/my-s3-bucket/images/${req.user._id}/${filename}`;

    s3_deleteObject(`images/${req.user._id}/${oldAvatarFilename}`)
      .catch(err => { console.log('error deleting old avatar file: ', err)});

    User.findByIdAndUpdate(req.user._id, { avatarUrl }, { new: true })
      .then(result => {
        res.send({ success: true, data: { avatarUrl } });
      })
      .catch(err => {
        res.send({ success: false, message: 'There was an error.'});
      });
  });

  //@TODO could make this router.delete('/users/avatar') and get filename from db instead of req body
  router.post('/users/avatar/remove', auth, (req, res, next) => {
    const { filename } = req.body;
    const genericAvatarUrl = 'https://s3.amazonaws.com/my-s3-bucket/images/generic/avatar.jpg';

    s3_deleteObject(`images/${req.user._id}/${filename}`)
      .then(result => {
        //@TODO handle bad result or file does not exists?
        return User.findByIdAndUpdate(req.user._id, { avatarUrl: genericAvatarUrl }, { new: true });
      })
      .then(result => {
        if (!result) {
          throw new Error('There was an error updating the avatar url in database.');
        } else {
          res.send({ success: true, data: { avatarUrl: result.avatarUrl }});
        }
      })
      .catch(err => {
        console.log('error updating avatarurl: ', err);
        res.send({ success: false, message: 'Error updating the Avatar.'});
      });
  });

  router.post('/users/update', auth, (req, res, next) => {
    const { userId, updates } = req.body;

    User.findByIdAndUpdate(userId, { ...updates }, { new: true })
      .then(result => {
        const userData = generateUserObjectResponse(result, req.token);
        res.send({ success: true, data: { user: userData } });
      })
      .catch(err => {
        res.send({ success: false, message: 'Error updating user.' });
      });
  });

  router.delete('/users/deleteaccount', auth, (req, res, next) => {
    Query.deleteUserAccount(req.user._id)
      .then(result => {
        console.log('deleted user account', result);
        res.status(200).send({ success: true });
      })
      .catch(err => {
        console.log('error deleting user account', err);
        res.status(500).send({ success: false, message: 'There was an error deleting your account.' });
      });
  });

  return router;
};

module.exports = userController;