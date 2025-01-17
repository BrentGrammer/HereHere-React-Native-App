import { STORE_USER_INFO, CLEAR_USER_INFO_FROM_STORE } from './actionTypes';
import config from '../../config/config';
import { sliceAvatarFilename } from '../../util/helpers';
import APP_CONSTANTS from '../../constants/App';

const baseUrl = config.SERVER_URL;

export const signupUser = (user) => {
  return dispatch => {
    return fetch(`${baseUrl}/users/signup`, {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user)
    })
    .then(res => {
      if (!res.ok) {
        throw new Error('There was an error. Please try again.');
      }
      return res.json();    
    })
    .then(parsedRes => {
      if (parsedRes.success) {
        dispatch(storeUserInfo({ ...parsedRes.data.user }));
      } else {
        const error = parsedRes.message || 'There was an error creating your account. Please try again.';
        throw new Error(error);
      }
      return parsedRes.success;
    });    
  };
};

export const loginUser = (user) =>  {
  const { email, password } = user;
  return dispatch => {
    return fetch(`${baseUrl}/users/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    })
    .then(res => {
      if (!res.ok) {
        throw new Error('Error logging in.');
      }
      return res.json();
    })
    .then(res => {
      if (res.success) {
        dispatch(storeUserInfo({ ...res.data.user }));
        return res.data.user;
      } else {
        throw new Error('Error logging in. Please check your info or try again, or Signup to create an account.');
      }
    });
  }
};

export const logoutUser = (token) => {
  return dispatch => {
    return fetch(`${baseUrl}/users/logout`, {
      method: "POST",
      headers: { 
        "Authorization": `Bearer ${token}`, 
        "Content-Type": "application/json" 
      },
      body: JSON.stringify({})
    })
    .then(res => {
      if (!res.ok) {
        throw new Error('Error logging out.');
      }
      return res.json();
    })
    .then(res => {
      dispatch(clearUserInfoFromStore());
      return res.success;
    });
  }
}

export const clearUserInfoFromStore =  () => ({
  type: CLEAR_USER_INFO_FROM_STORE
});

// userInfo {Object} - possible props - one or more of: userId, username, email, avatarUrl, tagline, summary
export const storeUserInfo = (userInfo) => {
  return {
    type: STORE_USER_INFO,
    userInfo
  };
};

export const deleteUserAccount = (token) => {
  return dispatch => {
    return fetch(`${baseUrl}/users/deleteaccount`, {
      method: "DELETE",
      headers: { 
        "Authorization": `Bearer ${token}`, 
        "Content-Type": "application/json" 
      }
    })
    .then(res => {
      if (!res.ok) {
        throw new Error('Error deleting Account.');
      }
      return res.json();
    })
    .then(res => {
      dispatch(clearUserInfoFromStore());
      return res.success;
    });
  }
};

export const updateUserInDatabase = (userId, updates, token) => {
  return dispatch => {
    return fetch(`${baseUrl}/users/update`, {
      method: 'POST',
      headers: {
        "Authorization": `Bearer ${token}`, 
        "Content-Type": "application/json" 
      },
      body: JSON.stringify({ userId, updates })
    })
    .then(res => {
      if (!res.ok) {
        throw new Error('Error updating.');
      }
      return res.json();
    })
    .then(res => {
      if (res.success) {
        return res.data;
      } else {
        throw new Error('Error updating.');
      }
    });
  };
};

export const updateAvatar = (user, filename) => {

  const { userId, token, avatarUrl } = user;
  const oldAvatarFilename = sliceAvatarFilename(avatarUrl);

  return (dispatch) => {
    return fetch(`${baseUrl}/users/avatar/update`, {
      method: 'POST',
      headers: { 
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json" 
      },
      body: JSON.stringify({ userId, filename, oldAvatarFilename })
    })
    .then(res => {
       if (!res.ok) {
         throw new Error('An error occurred.  Unable to update Avatar.')
       }
       return res.json();
    })
    .then(res => {
      if (res.success) {
        const { avatarUrl } = res.data;
        dispatch(storeUserInfo({ avatarUrl }));
      } else {
        throw new Error('Error updating Avatar Pic.');
      }
    });
  };
};  

export const removeAvatar = (userId, avatarUrl, token) => {
  return dispatch => {
    const filename = sliceAvatarFilename(avatarUrl);

    if (avatarUrl === APP_CONSTANTS.GENERIC_AVATAR_URL) {
      return new Promise.resolve();
    }
    
    return fetch(`${baseUrl}/users/avatar/remove`, {
      method: 'POST',
      headers: { 
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json" 
      },
      body: JSON.stringify({ userId, filename })
    })
    .then(res => {
      if (!res.ok) {
        throw new Error('There was an error removing your pic.');
      }
      return res.json();
    })
    .then(res => {
      if (res.success) {
        const { avatarUrl } = res.data;
        dispatch(storeUserInfo({ avatarUrl }));
      } else {
        throw new Error('Error removing Avatar Pic.');
      }
    }); 
  };
};
