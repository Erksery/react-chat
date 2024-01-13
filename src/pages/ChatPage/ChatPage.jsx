import React, { useEffect, useLayoutEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import BodyContainer from "../../components/bodyContainer/BodyContainer";
import Error from "../../components/error/Error";
import styles from "./ChatPage.module.scss";
import axios from "axios";
import { Icon36Send } from "@vkontakte/icons";
import Avatar from "../../avatar/avatar";
import { useHistory } from "../../hooks/useHistory";
import Messages from "../../components/messages/Messages";

function ChatPage() {
  const [searchValue, setSearchValue] = useState("");
  const [messageInputValue, setMassageInputValue] = useState("");
  const [usersList, setUsersList] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [searchLoading, setSearchLoading] = useState(true);
  const [selectUserId, setSelectUserId] = useState(null);
  const { userData, loading } = useAuth();
  const { history, setHistory, loadingHistory } = useHistory(selectUserId);

  const ws = new WebSocket("ws://localhost:5007");

  useEffect(() => {
    ws.onopen = () => {
      console.log("WebSocket connection opened");
    };
    ws.onmessage = (e) => {
      const data = JSON.parse(e.data);
      if ("message" in data) {
        console.log(JSON.parse(e.data));
        setHistory((prev) => [...prev, { ...data.message }]);
      } else if ("onlineUsers" in data) {
        console.log(data);
        //setOnlineUsers(data.onlineUsers);
      }
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    ws.onclose = () => {
      console.log("WebSocket connection closed");
    };

    return () => {
      ws.close();
    };
  }, []);

  const message = (e) => {
    e.preventDefault();
    ws.send(
      JSON.stringify({
        message: {
          recipient: selectUserId,
          text: messageInputValue,
          sender: userData.userId,
        },
      })
    );
  };

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

  const select = usersList.filter((name) => name._id === selectUserId);

  if (!userData.userLogin && !loading) {
    return <Error />;
  }

  return (
    <BodyContainer>
      <div className={styles.chatContainer}>
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
              usersList.map((user) => (
                <div
                  onClick={() => setSelectUserId(user._id)}
                  style={{
                    backgroundColor: user._id === selectUserId ? "#383b43" : "",
                  }}
                  key={user._id}
                  className={styles.userCard}
                >
                  {user && <Avatar user={user} />}

                  <span className={styles.userName}>{user.loginUser}</span>
                </div>
              ))
            ) : (
              <div className={styles.notUsers}>
                <p>Пользователь не найден</p>
              </div>
            )}
          </div>
        </div>
        <div className={styles.chat}>
          <div className={styles.chatHeader}>
            {selectUserId && <h2>Чат с {select[0].loginUser}</h2>}
            <p>{loadingHistory && "Обновление..."}</p>
          </div>
          <Messages
            loadingHistory={loadingHistory}
            selectUserId={selectUserId}
            history={history}
            userData={userData}
          />
          {!!selectUserId && (
            <form onSubmit={message} className={styles.chatInput}>
              <input
                value={messageInputValue}
                onChange={(e) => setMassageInputValue(e.target.value)}
                placeholder="Введите ваше сообщение..."
              />
              <button>
                <Icon36Send width={28} height={28} />
              </button>
            </form>
          )}
        </div>
      </div>
    </BodyContainer>
  );
}

export default React.memo(ChatPage);
