import React, { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import BodyContainer from "../../components/bodyContainer/BodyContainer";
import Error from "../../components/error/Error";
import styles from "./ChatPage.module.scss";
import { useHistory } from "../../hooks/useHistory";
import Messages from "../../components/messages/Messages";
import SendInput from "../../components/sendInput/SendInput";
import UserList from "../../components/userList/UserList";

function ChatPage({ ws }) {
  const [usersList, setUsersList] = useState([]);
  const [selectUserId, setSelectUserId] = useState(null);
  const { userData, loading } = useAuth();
  const { history, setHistory, loadingHistory } = useHistory(selectUserId);

  useEffect(() => {
    ws.onmessage = (e) => {
      const data = JSON.parse(e.data);
      if ("message" in data) {
        const { recipient, sender } = data.message;

        if (recipient === selectUserId || sender === selectUserId) {
          setHistory((prev) => [...prev, { ...data.message }]);
        }
      }
    };
  }, [selectUserId]);

  const select =
    usersList && usersList.filter((name) => name._id === selectUserId);

  if (!userData.userLogin && !loading) {
    return <Error />;
  }

  return (
    <BodyContainer>
      <div className={styles.chatContainer}>
        <UserList
          selectUserId={selectUserId}
          setSelectUserId={setSelectUserId}
          usersList={usersList}
          setUsersList={setUsersList}
        />
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
            <SendInput
              ws={ws}
              userData={userData}
              selectUserId={selectUserId}
            />
          )}
        </div>
      </div>
    </BodyContainer>
  );
}

export default React.memo(ChatPage);
