import { ADD_USER, REMOVE_USER, SET_OWNER_USER, SET_MEDIA_STREAM } from "./actionTypes";

export const ownerUser = ( user ) => {
  return {
    type: SET_OWNER_USER,
    payload: {
      initialUser: user,
    }
  }
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