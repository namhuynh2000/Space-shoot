import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import socket from "../../connections/socket";
import { selectUser } from "../../redux/reducers/userReducer";
export default function HostDisconnect() {
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  useEffect(() => {
    socket.on("hostDisconnect", () => {
      alert("Host has disconnected");
      navigate("/");
    });
  }, [socket]);
  return null;
}
