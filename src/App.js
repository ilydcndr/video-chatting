import './App.css';
import connectedInfo from './Backend/firebase';
import databaseRef from './Backend/firebase';
import { Login } from './Components/Login';
import { useEffect, useState } from 'react';
import { connect } from "react-redux";
import { ownerUser, addUser, removeUser } from './redux/actions/actionCreator';

function App() {
  const participantRef = databaseRef.child('participants')
  const [UserName, setUserName] = useState(null);

  const handleClick = (name) => {
    setUserName(name);
  }
  
  useEffect(() => {
    connectedInfo.on('value', (snap) => {
      if(snap.val()) {
        const defaultPreferences = {
          audio:false,
          video:false,
          screen:false,
        };
        const userRef = participantRef.push({
          UserName,
          preference: defaultPreferences,
        });

        userRef.onDisconnect().remove();
      }
    })
  }, [])


  return (
    <>
      <Login handleClick={handleClick} />
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
