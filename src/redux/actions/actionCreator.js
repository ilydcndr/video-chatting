import { ADD_USER, REMOVE_USER, SET_OWNER_USER, SET_MEDIA_STREAM, UPDATE_USER, UPDATE_PARTICIPANT, } from "./actionTypes";

export const ownerUser = ( user ) => {
  return {
    type: SET_OWNER_USER,
    payload: {
      initialUser: user,
    }
  }
};

export const updateUser = (user) => {
  return {
    type: UPDATE_USER,
    payload: {
      currentUser: user,
    },
  };
};

export const updateParticipant = (user) => {
  return {
    type: UPDATE_PARTICIPANT,
    payload: {
      newUser: user,
    },
  };
};

export const setMediaStream = ( media ) => {
  return {
    type: SET_MEDIA_STREAM,
    payload: {
      stream: media,
    }
  }
};

export const addUser = ( user ) => {
  return {
    type: ADD_USER,
    payload: {
      willAddUser: user,
    }
  }
};

export const removeUser = ( user ) => {
  return {
    type: REMOVE_USER,
    payload: {
      willRemoveUser: user,
    }
  }
};