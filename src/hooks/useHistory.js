import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addAllert } from "../store/allertSlice";

export const useHistory = ({ selectUserId }) => {
  const [history, setHistory] = useState([]);
  const [loadingHistory, setLoadingHistory] = useState(true);

  const dispatch = useDispatch();

  const messagesLimit = useSelector(
    (state) => state.limitMessagesStore.messagesLimit
  );

  useEffect(() => {
    setHistory([]);
    async function getHistory() {
      try {
        const resData = await axios.get("/api/history", {
          params: { selectChatId: selectUserId, messagesLimit: messagesLimit },
        });
        setHistory(resData.data);
      } catch (err) {
        setHistory([]);
        err.response &&
          dispatch(
            addAllert({
              allertText: err.response.data.error,
              allertStatus: err.response.status,
            })
          );
      } finally {
        //console.log("Загрузка завершена");
        setLoadingHistory(false);
      }
    }
    getHistory();
  }, [selectUserId, messagesLimit]);
  return { history, setHistory, loadingHistory };
};
