import { 
 STORE_CONVERSATIONS, UPDATE_CONVERSATIONS_LIST
} from "./actionTypes";
import config from '../../config/config';

const baseUrl = config.SERVER_URL;

export const getConversations = (userId, token) => {
  return dispatch => {
    return fetch(`${baseUrl}/conversations/${userId}`, {
      method: 'GET',
      headers: { "Authorization": `Bearer ${token}` }
    })
      .then(res => {
        if (!res.ok) {
          throw new Error('Error getting conversations.');
        }
        return res.json();
      })
      .then(res => {
        const conversations = res.data;
        dispatch(storeConversations(conversations));
        return conversations;
      });
  }
};

export const storeConversations = (conversations) => ({ 
  type: STORE_CONVERSATIONS,
  conversations 
}); 

export const updateConversationsList = (conversation) => ({
  type: UPDATE_CONVERSATIONS_LIST,
  conversation
});
