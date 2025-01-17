import { 
  STORE_CONVERSATIONS,
  UPDATE_CONVERSATIONS_LIST
} from '../actions/actionTypes';

const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case STORE_CONVERSATIONS:
      const newList = [ ...state, ...action.conversations ];
      return [...newList];
    case UPDATE_CONVERSATIONS_LIST:
      const newConversation = action.conversation;
      const filtered = state.filter(convoInStore => {
        console.log('convoinstoreid from reducer:', convoInStore._id, 'newconvo received from socket: ', newConversation._id)
        return convoInStore._id !== newConversation._id
      });
      return [ newConversation, ...filtered ];
    default:
      return state;
  }
};