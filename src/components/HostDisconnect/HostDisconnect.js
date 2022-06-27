import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import socket from "../../connections/socket";
export default function HostDisconnect() {
  useEffect(() => {
    socket.on("hostDisconnect", () => {
      alert("Host has disconnected");
      socket.disconnect();
    });
  }, []);
  return null;
}
