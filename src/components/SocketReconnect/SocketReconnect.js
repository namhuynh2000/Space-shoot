import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import socket from "../../connections/socket";

const SocketReconnect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleDisconnect = () => {
      socket.connect();
      navigate("/");
    };

    socket.on("disconnect", handleDisconnect);

    return () => {
      socket.off("disconnect", handleDisconnect);
    };
  }, []);
  return null;
};

export default SocketReconnect;
