import { activateListeners } from "../../Backend/peer";
import { ADD_USER, REMOVE_USER, SET_OWNER_USER, SET_MEDIA_STREAM } from "./actionTypes";

let initialState = {
  currentUser: null,
  participants: {},
  mediaStream: null
}

const servers = {
  iceServers: [
    {
      urls: [
        "stun:stun1.l.google.com:19302",
        "stun:stun2.l.google.com:19302",
        "stun:stun.l.google.com:19302",
        "stun:stun3.l.google.com:19302",
        "stun:stun4.l.google.com:19302",
        "stun:stun.services.mozilla.com",
      ],
    },
  ],
  iceCandidatePoolSize: 10,
};

export const reducer = (state = initialState, action) => {
  switch(action.type) {

    case SET_OWNER_USER: {
      let { payload } = action;
      let participants = { ...state.participants };
      state = {...state, currentUser: { ...payload.initialUser }, participants}
      activateListeners(Object.keys(payload.currentUser)[0]);
      return state;
    }

    case SET_MEDIA_STREAM: {
      let { payload } = action;
      state = {...state, ...payload};
      return state;
    }


    case ADD_USER: {
      let { payload } = action;
      
      const currentUserId = Object.keys(state.currentUser)[0];
      const participantId = Object.keys(payload.willAddUser)[0];

      if (currentUserId === participantId) {
        payload.WillAddUser[participantId].initialUser = true;
      }

      if(state.mediaStream && payload.WillAddUser[participantId].initialUser === false) {
        onConnectEachOther(state.initialUser, payload.WillAddUser, state.mediaStream);
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

const onConnectEachOther = (currentUser, newUser, videoStream ) => {
  const peerConnection = new RTCPeerConnection(stunServers);
  videoStream.getTracks().forEach((track) => {
    peerConnection.addTrack(track, videoStream);
  });

  const initialUserKey = Object.keys(currentUser)[0];
  const newUserKey = Object.keys(newUser)[0];

  const sortedId = [currentUser, newUser].sort((a, b)=> {
    a.localeCompare(b)
  });

  newUser[newUserKey].peerConnection = peerConnection;

  if (sortedId[1] === initialUserKey) {
    offer(peerConnection, sortedId[1], sortedId[0]);
  }
}