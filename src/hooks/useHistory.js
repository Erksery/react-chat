import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addAllert } from "../store/allertSlice";

export const useHistory = (selectUserId) => {
  const [history, setHistory] = useState([]);
  const [loadingHistory, setLoadingHistory] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    setHistory([]);
    async function getHistory() {
      try {
        const resData = await axios.get("/api/history", {
          params: { selectChatId: selectUserId },
        });
        setHistory(resData.data);
      } catch (err) {
        setHistory([]);
        dispatch(
          addAllert({
            allertText: err.response.data.error,
            allertStatus: err.response.status,
          })
        );
      } finally {
        console.log("Загрузка завершена");
        setLoadingHistory(false);
      }
    }
    getHistory();
  }, [selectUserId]);
  return { history, setHistory, loadingHistory };
};
