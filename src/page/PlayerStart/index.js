import React, { useEffect } from "react";
import socket from "../../connections/socket";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { checkPlayerExist } from "../../libs/library";
import { selectPlayer } from "../../redux/reducers/playerReducer";

const PlayerStartPage = () => {
  const navigate = useNavigate();
  const player = useSelector(selectPlayer);
  useEffect(() => {
    if (!checkPlayerExist(player)) {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    socket.on("startGameRes", (res) => {
      if (!res.result) {
        alert("Host started game failed");
        navigate("/");
      }
      navigate("/getReady");
    });
  }, []);

  return <div>Get ready! Host is starting the game</div>;
};

export default PlayerStartPage;
