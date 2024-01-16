import axios from "axios";
import React, { useEffect, useState } from "react";
import styles from "./UserList.module.scss";
import Avatar from "../avatar/Avatar";
import { useSelector } from "react-redux";

function UserList({ selectUserId, setSelectUserId, usersList, setUsersList }) {
  const [searchValue, setSearchValue] = useState("");
  const [searchLoading, setSearchLoading] = useState(true);

  const online = useSelector((state) => state.onlineUsersStore);

  useEffect(() => {
    const delay = setTimeout(() => {
      getSearchUsers();
    }, 300);
    return () => clearTimeout(delay);
  }, [searchValue]);

  async function getSearchUsers() {
    const resData = await axios.get("/api/searchUser", {
      params: { searchValue: searchValue },
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
                onClick={() => setSelectUserId(user._id)}
                style={{
                  backgroundColor: user._id === selectUserId ? "#383b43" : "",
                }}
                key={user._id}
                className={styles.userCard}
              >
                {user && (
                  <Avatar user={user} onlineUsers={online.onlineUsers} />
                )}

                <span className={styles.userName}>{user.loginUser}</span>
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
