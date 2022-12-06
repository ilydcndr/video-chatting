import './App.css';
import databaseRef, { userName, fr } from './Backend/firebase';
import { Login } from './Components/Login/Login';
import { useEffect, useState } from 'react';
import { connect } from "react-redux";
import { ownerUser, addUser, removeUser, setMediaStream } from './redux/actions/actionCreator';
import { MeetScreen } from './Components/MeetScreen/MeetScreen';

function App(props) {

  const connectInfoRef = fr.database().ref(".info/connected");
  const colleague = databaseRef.child("participants");

  const initialUserStream = async () => {
    const initialUserStream = await navigator.mediaDevices.getUserMedia({
     audio: false,
     video: false,
   });

   return initialUserStream
 };

  useEffect(() => {
    const stream = initialUserStream();
    props.setMediaStream(stream);

    connectInfoRef.on('value', (snap) => {
      if(snap.val()) {
        const defaultSettings = {
          audio:false,
          video:false,
          screen:false,
        };

        const userData = colleague.push({
          userName,
          settings: defaultSettings,
        });

        props.ownerUser({
          [userData.key]: {
            userName,
            ...defaultSettings,
          },
        });

        userData.onDisconnect().remove();
      }
    });
  }, []);

  useEffect(() => {
    if(props.user) {
      colleague.on("added", (snap) => {
        const {userName, settings} = snap.val()
        props.addUser({
          [snap.key]: {
            userName,
            ...settings,
          },
        });
      });
  
      colleague.on("removed", (snap) => {
        props.removeUser(snap.key);
      });

    }
  }, [props.user])
  

  return (
    <>    
      <MeetScreen />
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.currentUser,
    participants: state.participants
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setMediaStream: (media) => dispatch(setMediaStream(media)),
    ownerUser: (user) => dispatch(ownerUser(user)),
    addUser: (user) => dispatch(addUser(user)),
    removeUser: (user) => dispatch(removeUser(user))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
