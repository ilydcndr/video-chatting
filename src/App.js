import './App.css';
import connectedInfo from './Backend/firebase';
import databaseRef from './Backend/firebase';
import { Login } from './Components/Login';
import { useEffect, useState } from 'react';
import { connect } from "react-redux";
import { ownerUser, addUser, removeUser } from './redux/actions/actionCreator';

function App(props) {
  const participantRef = databaseRef.child('participants')
  const [UserName, setUserName] = useState(null);

  const handleClick = (name) => {
    setUserName(name);
  }
  
  useEffect(() => {
    connectedInfo.on('value', (snap) => {
      if(snap.val()) {
        const defaultSettings = {
          audio:false,
          video:false,
          screen:false,
        };

        const userRef = participantRef.push({
          UserName,
          settings: defaultSettings,
        });

        props.ownerUser({
          [userRef.key]: {
            UserName,
            ...defaultSettings,
          },
        });

        userRef.onDisconnect().remove();
      }
    });

    participantRef.on("added", (snap) => {
      const {UserName, settings} = snap.val()
      props.addUser({
        [snap.key]: {
          UserName,
          ...settings,
        },
      });
    });

    participantRef.on("removed", (snap) => {
      props.removeUser(snap.key);
    });
  }, []);


  return (
    <>
      <Login handleClick={handleClick} />
      <div>{props.user}</div>
      <div>{props.participants}</div>
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
    ownerUser: (initialUser) => dispatch(ownerUser(initialUser)),
    joinUser: (joinedUser) => dispatch(addUser(joinedUser)),
    leftUser: (leftUser) => dispatch(removeUser(leftUser))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
