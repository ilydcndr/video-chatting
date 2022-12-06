import React from 'react';
import { Participant } from '../Participant/Participant';
import "./AllParticipants.css";
import { useSelector } from 'react-redux';

export const AllParticipants = () => {
  const participants = useSelector((state) => state.participants)
  return (
    <div className='participants'>
      {Object.keys(participants).map((key) => {
        const currentParticipant = participants[key];
        return <Participant currentParticipant = {currentParticipant} key = {key}/>
      })}
    </div>
  );
};