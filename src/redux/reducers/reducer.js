import { ADD_USER, REMOVE_USER, SET_OWNER_USER } from "./actionTypes";

let initialState = {
  currentUser: null,
  participants: {},
}

export const reducer = (state = initialState, action) => {
  switch(action.type) {

    case SET_OWNER_USER: {
      let { payload } = action;
      let participants = { ...state.participants };
      state = {...state, currentUser: { ...payload.initialUser }, participants}
      return state;
    }


    case ADD_USER: {
      let { payload } = action;
      
      const currentUserId = Object.keys(state.currentUser)[0];
      const participantId = Object.keys(payload.willAddUser)[0];

      if (currentUserId === participantId) {
        payload.participantId(participantId).initialUser = true;
      }

      let participants = {...state.participants, ...payload.willAddUser};
      state = { ...state, participants};

      return state;
    }


    case REMOVE_USER: {
      let { payload } = action;
      let participants = { ...state.participants };
      delete participants[payload.willRemoveUser];
      state = {...state, participants}
      return state;
    }
    default: {
      return state;
    }
  }
};