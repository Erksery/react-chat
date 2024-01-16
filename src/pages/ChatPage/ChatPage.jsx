import React, { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import BodyContainer from "../../components/bodyContainer/BodyContainer";
import Error from "../../components/error/Error";
import styles from "./ChatPage.module.scss";
import { useHistory } from "../../hooks/useHistory";
import Messages from "../../components/messages/Messages";
import SendInput from "../../components/sendInput/SendInput";
import UserList from "../../components/userList/UserList";
import { useWsConnection } from "../../hooks/useWsConnection";

function ChatPage() {
  const [usersList, setUsersList] = useState([]);
  const [selectUserId, setSelectUserId] = useState(null);
  const [selectUserData, setSelectUserData] = useState({});
  const { userData, loading } = useAuth();
  const { history, setHistory, loadingHistory } = useHistory(selectUserId);
  const { ws } = useWsConnection();

  useEffect(() => {
    ws.onopen = () => {
      console.log("WebSocket connection opened");
    };

    ws.onmessage = (e) => {
      const data = JSON.parse(e.data);
      if ("message" in data) {
        const { recipient, sender } = data.message;
        console.log(data);

        if (recipient === selectUserId || sender === selectUserId) {
          setHistory((prev) => [...prev, { ...data.message }]);
        }
      }
    };

    selectUserId &&
      setSelectUserData(usersList.find((item) => item._id === selectUserId));
  }, [selectUserId]);

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
            {selectUserId && <h2>Чат с {selectUserData.loginUser}</h2>}
            <p>{loadingHistory && "Обновление..."}</p>
          </div>
          <Messages
            loadingHistory={loadingHistory}
            selectUserId={selectUserId}
            history={history}
            userData={userData}
          />
          {!!selectUserId && (
            <SendInput userData={userData} selectUserId={selectUserId} />
          )}
        </div>
      </div>
    </BodyContainer>
  );
}

export default React.memo(ChatPage);
