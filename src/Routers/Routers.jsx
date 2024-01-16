import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import AuthPage from "../pages/AuthPage/AuthPage";
import RegPage from "../pages/RegPage/RegPage";
import ChatPage from "../pages/ChatPage/ChatPage";
import { useDispatch, useSelector } from "react-redux";
import { addOnlineUsers } from "../store/onlineUsersSlice";

export default function Routers() {
  const [test, setTest] = useState(0);
  const dispatch = useDispatch();

  const online = useSelector((state) => state.onlineUsersStore);

  const ws = new WebSocket("ws://localhost:5007");

  useEffect(() => {
    ws.onopen = () => {
      console.log("WebSocket connection opened");
    };
    ws.onmessage = (e) => {
      const data = JSON.parse(e.data);

      if ("onlineUsers" in data) {
        //   //dispatch(addOnlineUsers(data));

        console.log(data);
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

  return (
    <Routes>
      <Route path="/" element={<RegPage />} />
      <Route path="/reg" element={<RegPage />} />
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/chat" element={<ChatPage ws={ws} />} />
    </Routes>
  );
}
