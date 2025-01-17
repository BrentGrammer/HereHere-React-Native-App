import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import thunk from "redux-thunk";
import mapReducer from './reducers/map';
import placesReducer from './reducers/places';
import userReducer from './reducers/user';
import messagesReducer from './reducers/messages';
import flagsReducer from './reducers/flags';
import chatReducer from './reducers/chat';
import userSelectedReducer from './reducers/userSelected';
import conversationsReducer from './reducers/conversations';
import { CLEAR_USER_INFO_FROM_STORE } from './actions/actionTypes';

let composeEnhancers = compose;
// for redux dev tools:
if (__DEV__) {
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}

const appReducer = combineReducers({
  map: mapReducer,
  user: userReducer,
  userSelected: userSelectedReducer, // stores details of user in users list selected
  places: placesReducer,
  chat: chatReducer,
  conversations: conversationsReducer,
  messages: messagesReducer,
  flags: flagsReducer
});

const rootReducer = (state, action) => {
  if (action.type === CLEAR_USER_INFO_FROM_STORE) {
    state = undefined;
  }

  return appReducer(state, action);
}

const configureStore = () => {
  return createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));
};

export default configureStore;