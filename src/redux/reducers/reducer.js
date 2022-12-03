import { JOIN_USER, LEAVE_USER, OWNER_USER } from "./actionTypes";

let initialState = {
  currentUser: null,
  participants: {},
}

export const reducer = (state = initialState, action) => {
  switch(action.type) {

    case OWNER_USER: {
      let { payload } = action;
      state = {...state, currentUser: { ...payload.ownerUser }}
      return state;
    }


    case JOIN_USER: {
      let { payload } = action;
      const currentUserId = Object.keys(state.currentUser)[0];
      const participantId = Object.keys(payload.joinedUser)[0];

      if (currentUserId === participantId) {
        payload.participantId(participantId).currentUser = true;
      }

      let participants = {...state.participants, ...payload.joinedUser};
      state = { ...state, participants};

      return state;
    }


    case LEAVE_USER: {
      let { payload } = action;
      let participants = { ...state.participants };
      delete participants[payload.leftUser];
      state = {...state, participants}
      return state;
    }
    default: {
      return state;
    }
  }
};