import React, { useRef, useEffect } from 'react';
import './Participant.css'
import { Card } from '../Card/Card';
import { useSelector } from 'react-redux';

export const Participant = ({ currentparticipant }) => {
  const videoRef = useRef(null);
  const remoteStream = new MediaStream();
  const userStream = useSelector((state) => state.mediaStream);

  useEffect(() => {
    if ( currentparticipant.peerConnection ) {
      currentparticipant.peerConnection.ontrack = (e) => {
        e.streams[0].getTracks.forEach(track => {
          remoteStream.addTrack(track);
        });

        videoRef.current.srcObject = remoteStream;
      };
    }
  }, [currentparticipant.peerConnection]);

  useEffect(() => {
    if ( userStream && currentparticipant.initialUser) {
      videoRef.current.srcObject = userStream;
    }
  }, [currentparticipant.initialUser, userStream]);
  

  return (
    <div>
      <Card/>
      <video ref={videoRef} className="video" autoPlay playsInline></video>
      <div>{currentparticipant.userName} or photo</div>
      <div>
        {currentparticipant.userName}
        {currentparticipant.initialUser ? "(YOUR CARD)": ""}
      </div>
    </div>
  )
}