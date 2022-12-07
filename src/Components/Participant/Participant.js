import React from "react";
import { faMicrophoneSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Participant.scss";

export const Participant = (props) => {
  const {
    curentIndex,
    currentParticipant,
    hideVideo,
    videoRef,
    showAvatar,
    currentUser,
  } = props;
  if (!currentParticipant) return <></>;
  return (
    <div className={`participant ${hideVideo ? "hide" : ""}`}>
      <div className="card">
        <video
          ref={videoRef}
          className="video"
          id={`participantVideo${curentIndex}`}
          autoPlay
          playsInline
        ></video>
        {!currentParticipant.audio && (
          <FontAwesomeIcon
            className="muted"
            icon={faMicrophoneSlash}
            title="Muted"
          />
        )}
        {showAvatar && (
          <div
            style={{ background: currentParticipant.avatarColor }}
            className="avatar"
          >
            {currentParticipant.name[0]}
          </div>
        )}
        <div className="name">
          {currentParticipant.name}
          {currentUser ? "(You)" : ""}
        </div>
      </div>
    </div>
  );
};
