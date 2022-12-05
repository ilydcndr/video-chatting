import React from 'react';
import './Participant.css'
import { Card } from '../Card/Card';

export const Participants = ({ currentparticipant }) => {
  return (
    <div>
      <Card/>
      <div>{currentparticipant.userName} or photo</div>
      <div>
        {currentparticipant.userName}
        {currentparticipant.initialUser ? "(YOUR CARD)": ""}
      </div>
    </div>
  )
}