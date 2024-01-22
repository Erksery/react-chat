import { useLayoutEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addOnlineUsers } from "../store/onlineUsersSlice";
import { useNavigate } from "react-router-dom";

export const useWsConnection = () => {
  const [ws, setWs] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    const wss = new WebSocket("ws://localhost:5007");

    wss.onopen = () => {
      console.log("WebSocket connection opened");
    };
    wss.onmessage = (e) => {
      const data = JSON.parse(e.data);

      handleMessage(data);
    };

    wss.onerror = (error) => {
      //navigate("/error");
    };

    wss.onclose = () => {
      console.log("WebSocket connection closed");
    };

    setWs(wss);
    return () => {
      wss.close();
    };
  }, []);

  function handleMessage(message) {
    if ("onlineUsers" in message) {
      dispatch(addOnlineUsers(message.onlineUsers));
      console.log(message);
    }
  }

  return { ws };
};
