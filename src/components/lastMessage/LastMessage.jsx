import React from "react";

function LastMessage({ userData, user }) {
  return (
    <div>
      <span>{userData.userId !== user.sender ? "Вы: " : `111 `}</span>
      <span>{user.lastMessageData.text}</span>
    </div>
  );
}

export default LastMessage;
