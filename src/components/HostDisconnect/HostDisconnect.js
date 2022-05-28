import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import socket from "../../connections/socket";
export default function HostDisconnect() {
  const navigate = useNavigate();
  useEffect(() => {
    socket.on("hostDisconnect", () => {
      alert("Host has disconnected");
      navigate("/");
    });
  }, [socket]);
  return null;
}
