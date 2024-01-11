import React from "react";
import { Route, Routes } from "react-router-dom";
import AuthPage from "../../pages/AuthPage/AuthPage";
import RegPage from "../../pages/RegPage/RegPage";
import ChatPage from "../../pages/ChatPage/ChatPage";

export default function Routers() {
  return (
    <Routes>
      <Route path="/" element={<RegPage />} />
      <Route path="/reg" element={<RegPage />} />
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/chat" element={<ChatPage />} />
    </Routes>
  );
}
