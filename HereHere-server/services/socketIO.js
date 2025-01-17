const socketIO = require('socket.io');
const { storeMessage, updateMessage } = require('../queries/messageQueries');
const { updateConversations } = require("../queries/conversationQueries");
const { getLimitedUserInfo } = require('../queries/userQueries');
const { Users } = require('../util/Users');

const startSocketIO = (server) => {
  const io = socketIO(server);
  const users = new Users();

  io.on('connection', socket => {
    console.log('client connected on websocket');
   
    socket.on('disconnect', () => {
      console.log('client disconnected');
      users.removeSocketId(socket.id);
      console.log(`user with socketid ${socket.id} removed from socketids`, users.socketIds);

      const user = users.removeUser(socket.id);
      if (user) {
        io.to(user.room).emit('updateUsersList', users.getUsersList(user.room));
      }
    });
    
    socket.on('sendUserIdToServerToUpdateSocketIdsList', (userId) => {
      users.addSocketId(socket.id, userId);
      console.log(`${socket.id} added to users with id: ${userId}, list: ${users.socketIds}`);
    });

    socket.on('removeSocketIdFromServerList', (socketId) => {
      users.removeSocketId(socketId);
      console.log(`${socket.id} removed from users list, list: ${users.socketIds}`);
    });
  
    socket.on('createMessage', async (message) => {
      if (!message.text.length > 0) {
        console.log('empty message...returning')
        return;
      }
      const user = users.getUser(socket.id);
      const storedMessage = await storeMessage(message);
  
      // check if user returned and if the text is valid (this prevents users from sending empty messages or bunch of spaces)
      if (user) {
        io.to(user.room).emit('newMessage', {
          user: {
            username: message.user.username,
            avatarUrl: message.user.avatarUrl,
            tagline: message.user.tagline,
            summary: message.user.summary
          },
          createdAt: storedMessage.createdAt,
          text: message.text,
          key: storedMessage.id // sent to use as key for flat list rendering
        });   
      }
    });
  
    socket.on('join', (params, callback) => {
      const { user, room } = params;
      console.log('user joined' + room, user)
      if (!room || !user) {
        const error = 'Cannot join room: User and room are missing or invalid.';
        callback(error);
      }
      socket.join(room);
      users.removeUser(socket.id);
      users.addUser(socket.id, user, room);
     
      const usersList = users.getUsersList(room);
      if (room !== 'private') {
        io.to(params.room).emit('updateUsersList', usersList);
      }
      callback();
    });
  
    socket.on('createPrivateMessage', ({ to, from, text }, callback) => {
      const toSocketId = users.getSocketId(to);
      const connectedSocket = socket.id;

      const emitEventToSenderAndReceiver = (eventString, data) => {
        if (toSocketId) {     
          io.to(toSocketId).emit(eventString, data);
        }    
        io.to(connectedSocket).emit(eventString, data);
        const error = null
        callback(error);
      };

      const emitUpdateConversations = (fromUserInfo, toUserInfo, conversation) => {
        // to User info goes back to sender
        const conversationToSender = {
          ...conversation._doc,
          conversationWith: toUserInfo 
        }
        // from User info goes to receiver socket id
        const conversationToReceiver = {
          ...conversation._doc,
          conversationWith: fromUserInfo 
        };

        // from sender - send the to user info
        io.to(connectedSocket).emit('updateConversations', conversationToSender);
        // to the socket id for to, the from user info goes here:
        if (toSocketId) {     
          io.to(toSocketId).emit('updateConversations', conversationToReceiver);
        }   
        const error = null;
        callback(error);
      };
  
      storeMessage({ to, from, text })
        .then(message => { 
          return updateConversations(message);
        })
        .then(async (conversation) => {
          const messageId = conversation.lastUpdateMessageId;
          const fromUserId = from;
          const toUserId = to;

          const fromUserInfo = await getLimitedUserInfo(fromUserId);
          const toUserInfo = await getLimitedUserInfo(toUserId);

          emitUpdateConversations(fromUserInfo, toUserInfo, conversation);

          return updateMessage(messageId, { conversationId: conversation.id });
        })
        .then(message => {
          emitEventToSenderAndReceiver('newPrivateMessage', message);
        })
        .catch(err => {
          console.log('Error storing private message and emitting', err);
          callback(err);
        });
     });
  });
}

module.exports = { startSocketIO };