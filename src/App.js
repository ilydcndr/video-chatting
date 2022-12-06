import './App.css';
import databaseRef, { userName, fr } from './Backend/firebase';
import { Login } from './Components/Login/Login';
import { useEffect } from 'react';
import { connect } from "react-redux";
import { ownerUser, addUser, removeUser, setMediaStream, updateParticipant } from './redux/actions/actionCreator';
import MeetScreen from './Components/MeetScreen/MeetScreen';

function App(props) {
  const getUserStream = async () => {
    const localStream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });

    return localStream;
  };
  
  useEffect(() => {

    async function fetchData() {
      const stream = await getUserStream();
      stream.getVideoTracks()[0].enabled = false;
      props.setMediaStream(stream);

      connectedRef.on("value", (snap) => {
        if (snap.val()) {
          const defaultPreference = {
            audio: true,
            video: false,
            screen: false,
          };
          const userStatusRef = participantRef.push({
            userName,
            preferences: defaultPreference,
          });
          props.ownerUser({
            [userStatusRef.key]: { name: userName, ...defaultPreference },
          });
          userStatusRef.onDisconnect().remove();
        }
      });

    }
    fetchData();    
  }, []);

  const connectedRef = fr.database().ref(".info/connected");
  const participantRef = databaseRef.child("participants");

  const isUserSet = !!props.user;
  const isStreamSet = !!props.stream;

  useEffect(() => {
    if (isStreamSet && isUserSet) {
      participantRef.on("child_added", (snap) => {
        const participantRef = participantRef
          .child(snap.key)
          .child("preferences");
          participantRef.on("child_changed", (preferenceSnap) => {
            props.updateParticipant({
              [snap.key]: {
                [preferenceSnap.key]: preferenceSnap.val(),
              },
            });
          });
        const { userName: name, preferences = {} } = snap.val();
        props.addParticipant({
          [snap.key]: {
            name,
            ...preferences,
          },
        });
      });
      participantRef.on("child_removed", (snap) => {
        props.removeUser(snap.key);
      });
    }
  }, [isStreamSet, isUserSet]);

  return (
    <div className="App">
      <MeetScreen />
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    stream: state.mainStream,
    user: state.currentUser,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setMediaStream: (stream) => dispatch(setMediaStream(stream)),
    addUser: (user) => dispatch(addUser(user)),
    ownerUser: (user) => dispatch(ownerUser(user)),
    removeUser: (user) => dispatch(removeUser(user)),
    updateParticipant: (user) => dispatch(updateParticipant(user)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
