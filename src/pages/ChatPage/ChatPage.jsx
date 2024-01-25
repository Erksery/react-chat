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
import { useDispatch, useSelector } from "react-redux";
import { setMessagesLimit } from "../../store/limitMessagesSlice";
import Avatar from "../../components/avatar/Avatar";

function ChatPage() {
  const [usersList, setUsersList] = useState([]);
  const [selectUserId, setSelectUserId] = useState(null);
  const [selectUserData, setSelectUserData] = useState({});
  const [lastMessage, setLastMessage] = useState({});

  const dispatch = useDispatch();
  const online = useSelector((state) => state.onlineUsersStore);

  const { userData, loading, errorAuth } = useAuth();
  const { history, setHistory, loadingHistory } = useHistory({
    selectUserId,
  });
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
          setLastMessage({ ...data.message });
        }
      }
    };

    selectUserId &&
      setSelectUserData(usersList.find((item) => item._id === selectUserId));
  }, [selectUserId]);

  if (!userData.userLogin && !loading) {
    return <Error />;
  }

  if (errorAuth) {
    return (
      <div>
        <h1>{errorAuth}</h1>
      </div>
    );
  }

  return (
    <BodyContainer>
      <div className={styles.chatContainer}>
        <UserList
          lastMessage={lastMessage}
          selectUserId={selectUserId}
          setSelectUserId={setSelectUserId}
          usersList={usersList}
          setUsersList={setUsersList}
          userData={userData}
        />
        <div className={styles.chat}>
          <div
            onClick={() => dispatch(setMessagesLimit())}
            className={styles.chatHeader}
          >
            {selectUserId && userData && (
              <div className={styles.selectUser}>
                <Avatar
                  id={selectUserData._id}
                  login={selectUserData.loginUser}
                  color={selectUserData.avatarColor}
                  onlineUsers={online.onlineUsers}
                />
                <p>{selectUserData.loginUser}</p>
              </div>
            )}
            <p>{loadingHistory && "Обновление..."}</p>
          </div>

          {!!selectUserId ? (
            <>
              <Messages
                history={history}
                loadingHistory={loadingHistory}
                selectUserId={selectUserId}
                userData={userData}
              />
              <SendInput
                userData={userData}
                selectUserId={selectUserId}
                selectUserData={selectUserData}
              />
            </>
          ) : (
            <div className={styles.boardContainer}>
              <p>Выберите пользователя</p>
            </div>
          )}
        </div>
      </div>
    </BodyContainer>
  );
}

export default ChatPage;
