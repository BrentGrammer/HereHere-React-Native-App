import socketIO from 'socket.io-client';
import config from "../config/config";
import { storeRoomUsersList } from '../store/actions/chat';
import { storePublicMessages, storePrivateMessages } from '../store/actions/messages';
import { updateConversationsList } from '../store/actions/conversations';

const socket = socketIO(config.SERVER_URL, {
  transports: ['websocket'],
  jsonp: false
});

export const startSocketIO = (store) => {
  socket.connect();
  
  socket.on('connect', () => {
    const { userId } = store.getState().user;
    if (userId) {
      emitSendUserIdToServerToUpdateSocketIdsList(userId);
    }
  });
  
  socket.on('disconnect', () => {
    console.log('connection to server lost.');
  });
  
  socket.on('newMessage', (message) => {
    store.dispatch(storePublicMessages([ message ]));
  });
  
  socket.on('newPrivateMessage', (message) => {
    //@TODO: Check if the to prop on the message has the user id of current user and put new message notification.
    // Or on backend only emit to this socket id!

    // update message list in store to put new message on screen
    const messagesInState = store.getState().messages.private;
   
    store.dispatch(storePrivateMessages([ ...messagesInState, message ]));
  });

  socket.on('updateConversations', (conversation) => {
    store.dispatch(updateConversationsList(conversation));
  });

  socket.on('updateUsersList', (users) => {
    // [
    //     Object {
    //      `"userId"
    //      "avatarUrl": "https://s3.amazonaws.com/my-s3-bucket/images/generic/avatar.jpg",
    //      "tagline": "",
    //       "email": null,
    //       "summary": "",
    //       "username": "User",
    // ]  },
    //   ]
    store.dispatch(storeRoomUsersList(users));
  });
};
  
export const emitCreateMessage = ({ place, user, text, city }) => {
  socket.emit('createMessage', {
    place,
    user,
    city,
    text
  });
};

export const emitSendUserIdToServerToUpdateSocketIdsList = (userId) => {
  socket.emit('sendUserIdToServerToUpdateSocketIdsList', userId);
};

export const emitRemoveSocketIdFromServerList = () => {
  socket.emit('removeSocketIdFromServerList', socket.id);
};

export const emitCreatePrivateMessage = ({ to, from, text }) => {
  return new Promise((resolve, reject) => {
    socket.emit('createPrivateMessage', { to, from, text }, (err) => {
      if (!err) {
        resolve();  
      } else {
        console.log('there was an error sending the private message', err)
        reject();
      }
    });
  });
};

export const emitJoinChatRoom = (user, room) => {
  const callback = (err) => {
    if (err) {
      console.log('error joining room', err);
      // Store error in redux to display to user in chat area.
    } else {
      console.log('room joined successfully');
      // return true or something to indicate the join was successful and get messages for place from db and update userslist
    }
  };
  
  const { username, userId, avatarUrl, tagline, summary } = user;
  const params = { 
    user: { 
      username, 
      userId, 
      avatarUrl, 
      tagline, 
      summary 
    }, 
    room 
  };

  socket.emit('join', params, callback);
};



