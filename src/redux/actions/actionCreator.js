import { JOIN_USER, LEAVE_USER, OWNER_USER } from "./actionTypes";

export const ownerUser = ( initialUser ) => {
  return {
    type: OWNER_USER,
    payload: {
      initialUser,
    }
  }
};

export const addUser = ( joinedUser ) => {
  return {
    type: JOIN_USER,
    payload: {
      joinedUser,
    }
  }
};

export const removeUser = ( leftUser ) => {
  return {
    type: LEAVE_USER,
    payload: {
      leftUser,
    }
  }
};