import databaseRef from "./firebase";
import { store } from "..";

const participantRef = databaseRef.child("participants");

export const offer = async (peerConnection, createdId, receiverId) => {

  const receiverUser = participantRef.child(receiverId);
  const offer = await peerConnection.offer();
  await peerConnection.setLocalDescription(offer);

  peerConnection.onicecandidate = e => {
    e.candidate && receiverUser
      .child("offerCandidates")
      .push({ ...e.candidate.toJson(), userId: createdId });
  }

  const offerPayload = {
    sdp: offer.sdp,
    type: offer.type,
    userId: createdId,
  };

  await receiverUser.child('offer').push().set({ offerPayload });
}

export const activateListeners = async (userId) => {
  const currentUserRef = participantRef.child(userId);

  currentUserRef.child("offer").on("added", async (snapshot) => {
    const data = snapshot.val();
    if(data?.offerPayload) {
      const createrId = data?.offerPayload.userId;
      const peerConncetion = store.getState().participants[createrId].peerConnection;
      await peerConncetion.setRemoteDescription(new RTCSessionDescription(data?.offerPayload));

      await answer(createrId, userId);
    }
  });

  currentUserRef.child("offerCandidates").on("added", async (snapshot) => {
    const data = snapshot.val();
    if(data?.userId) {
      const peerConncetion = store.getState().participants[data?.userId].peerConnection;

      peerConncetion.addIceCandidate(new RTCIceCandidate(data));
    }
  });

  currentUserRef.child("answer").on("added", async (snapshot) => {
    const data = snapshot.val();
    if(data?.answer) {
      const answeredId = data?.answer.userId;
      const peerConncetion = store.getState().participants[answeredId].peerConnection;
      await peerConncetion.setRemoteDescription(new RTCSessionDescription(data?.answer));
    }
  });

  currentUserRef.child("answerCandidates").on("added", async (snapshot) => {
    const data = snapshot.val();
    if(data?.userId) {
      const peerConncetion = store.getState().participants[data?.userId].peerConnection;
      await peerConncetion.setRemoteDescription(new RTCIceCandidate(data));
    }
  });
};

const answer = async (otherUserId, userId) => {
  const peerConncetion = store.getState().participants[otherUserId].peerConnection;
  const otherParticipants = participantRef.child(otherUserId);
  peerConncetion.onicecandidate = (event) => {
    event.candidate &&
      otherParticipants
        .child("answerCandidates")
        .push({ ...event.candidate.toJSON(), userId: userId });
  };

  const answerPc = await peerConncetion.answer();
  await peerConncetion.setLocalDescription(answerPc);

  const answer = {
    type: answerPc.type,
    sdp: answerPc.sdp,
    userId: userId,
  };

  await otherParticipants.child("answers").push().set({ answer });
};

export const updatePreference = (userId, preference) => {
  const currentParticipantRef = participantRef
    .child(userId)
    .child("preferences");
  setTimeout(() => {
    currentParticipantRef.update(preference);
  });
};