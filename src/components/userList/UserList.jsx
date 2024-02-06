import axios from "axios";
import React, { useEffect, useState } from "react";
import styles from "./UserList.module.scss";
import Avatar from "../avatar/Avatar";
import { useSelector } from "react-redux";
import LastMessage from "../lastMessage/LastMessage";

function UserList({
  selectUserId,
  setSelectUserId,
  usersList,
  setUsersList,
  userData,
  lastMessage,

}) {
  const [searchValue, setSearchValue] = useState("");
  const [searchLoading, setSearchLoading] = useState(true);

  const online = useSelector((state) => state.onlineUsersStore);

  useEffect(() => {
    const delay = setTimeout(() => {
      getSearchUsers();
    }, 300);
    return () => clearTimeout(delay);
  }, [searchValue, lastMessage]);

  async function getSearchUsers() {
    const resData = await axios.get("/api/searchUser", {
      params: { searchValue: searchValue, userId: userData.userId },
    });
    try {
      setUsersList(resData.data);
    } catch (err) {
      console.log(err);
    } finally {
      setSearchLoading(false);
    }
  }

  return (
    <div className={styles.userList}>
      <input
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        placeholder="Найти собеседника"
      />
      <div className={styles.userScroll}>
        {searchLoading ? (
          <div className={styles.notUsers}>
            <p>Загрузка</p>
          </div>
        ) : usersList.length > 0 ? (
          usersList.map((user) => {
            return (
              <div
                onClick={() =>{ setSelectUserId(user._id)}}
                style={{
                  backgroundColor: user._id === selectUserId ? "#4099ffa5" : "",
                }}
                key={user._id}
                className={styles.userCard}
              >
                {user && (
                  <Avatar
                    id={user._id}
                    login={user.loginUser}
                    color={user.avatarColor}
                    onlineUsers={online.onlineUsers}
                  />
                )}

                <div className={styles.userDataContainer}>
                  <span className={styles.userName} translate="no">
                    {user.loginUser}
                  </span>

                  <p>
                    {user.lastMessageData ? (
                      <LastMessage
                        userData={userData}
                        user={user}
                        lastMessage={lastMessage}
                      />
                    ) : (
                      ""
                    )}
                  </p>
                </div>
              </div>
            );
          })
        ) : (
          <div className={styles.notUsers}>
            <p>Пользователь не найден</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default UserList;
