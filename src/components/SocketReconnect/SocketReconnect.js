import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import socket from "../../connections/socket";
const SocketReconnect = () => {
  const navigate = useNavigate();
  useEffect(() => {
    socket.on("disconnect", () => {
      console.log("abc");
      socket.connect();
      navigate("/");
    });
  }, []);
  return null;
};

export default SocketReconnect;
