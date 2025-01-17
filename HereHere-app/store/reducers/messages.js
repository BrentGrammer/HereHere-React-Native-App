import { 
  STORE_PUBLIC_MESSAGES, 
  STORE_PRIVATE_MESSAGES, 
  UNSET_PUBLIC_MESSAGES,
  UNSET_PRIVATE_MESSAGES,
  SET_CONVERSATION_SELECTED 
} from '../actions/actionTypes';

const initialState = {
  public: [],
  private: [],
  conversationSelected: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case UNSET_PUBLIC_MESSAGES:
      return { ...state, public: [] };
    case STORE_PUBLIC_MESSAGES:
      return { ...state, public: [ ...state.public, ...action.messages ]};
    case STORE_PRIVATE_MESSAGES:
      return { ...state, private: action.messages };
    case UNSET_PRIVATE_MESSAGES:
      return { ...state, private: [] };
    case SET_CONVERSATION_SELECTED:
      return { ...state, conversationSelected: action.conversationSelected };
    default:
      return state;
  }
};