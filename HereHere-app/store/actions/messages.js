import {
  STORE_PUBLIC_MESSAGES,
  UNSET_PUBLIC_MESSAGES,
  STORE_PRIVATE_MESSAGES,
  SET_CONVERSATION_SELECTED,
  UNSET_PRIVATE_MESSAGES,
} from "./actionTypes";
import config from "../../config/config";

const baseUrl = config.SERVER_URL;

export const storePublicMessages = (messages) => ({
  type: STORE_PUBLIC_MESSAGES,
  messages,
});

export const setConversationSelected = (conversation) => ({
  type: SET_CONVERSATION_SELECTED,
  conversationSelected: conversation,
});

export const unsetPublicMessages = () => ({
  type: UNSET_PUBLIC_MESSAGES,
});

export const getLatestActivity = (city = "World") => {
  const encodedCity = encodeURIComponent(city);

  return fetch(`${baseUrl}/chat/${encodedCity}/latest-activity`)
    .then((res) => {
      if (!res.ok) {
        throw new Error("There was an error with the request.");
      }
      return res.json();
    })
    .then((res) => {
      return res;
    });
};

export const loadMessagesForPlace = (placeId) => {
  return (dispatch) => {
    dispatch(unsetPublicMessages());

    return getMessagesForPlace(placeId).then((res) => {
      dispatch(storePublicMessages(res.data));
    });
  };
};

export const getMessagesForPlace = (placeId) => {
  //@TODO: replace devServerUrl with prodServerUrl when server is deployed and update config file
  // NOTE: needed to use same ip address used to connect with socketio here in development
  const baseUrl = config.SERVER_URL;

  return fetch(`${baseUrl}/chat/${placeId}`)
    .then((res) => {
      if (!res.ok) {
        throw new Error("Error getting chat messages");
      }
      return res.json();
    })
    .then((res) => {
      if (!res.success) {
        throw new Error(res.message);
      }
      return res;
    });
};

export const loadMessagesForConversation = (conversationId, token) => {
  return (dispatch) => {
    return fetch(`${baseUrl}/messages/private/${conversationId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Error getting messages.");
        }
        return res.json();
      })
      .then((res) => {
        dispatch(storePrivateMessages(res.data));
      });
  };
};

export const storePrivateMessages = (messages) => ({
  type: STORE_PRIVATE_MESSAGES,
  messages,
});

export const unsetPrivateMessages = () => ({
  type: UNSET_PRIVATE_MESSAGES,
});
