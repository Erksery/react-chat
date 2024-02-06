import React from "react";
import Avatar from "../avatar/Avatar";
import styles from "./ChatHeader.module.scss";
import { Icon28DeleteOutlineAndroid } from "@vkontakte/icons";
import axios from "axios";

function ChatHeader({ selectUserData, online, selectMessages, userData, handleDeleteMessage }) {


  return (
    <div className={styles.selectUser}>
      <div className={styles.selectUserInfo}>
        <Avatar
          id={selectUserData._id}
          login={selectUserData.loginUser}
          color={selectUserData.avatarColor}
          onlineUsers={online.onlineUsers}
        />
        <p>{selectUserData.loginUser}</p>
      </div>

      {selectMessages.length !== 0 && (
        <div className={styles.editContainer}>
          <div>Выбранно: {selectMessages.length}</div>
          <button onClick={handleDeleteMessage} className={styles.editButton}>
            <Icon28DeleteOutlineAndroid width={18} height={18} />
          </button>
        </div>
      )}
    </div>
  );
}

export default ChatHeader;
