import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import socket from "../../connections/socket";
import { useNavigate, useSearchParams } from "react-router-dom";
import { selectHost } from "../../redux/reducers/hostReducer";

const HostStartPage = () => {
  const host = useSelector(selectHost);
  const [count, setCount] = useState(-1);
  const navigate = useNavigate();
  const [params] = useSearchParams();

  useEffect(() => {
    if (!host.room || !host.gameName) {
      alert("Start failed");
      navigate("/host");
    }

    socket.emit("startGame", host.room);

    // let counting = 3;
    // const interval = setInterval(() => {
    //   if (counting === 0) {
    //     setIsStarting(true);
    //     clearInterval(interval);
    //   }
    //
    //   setCount(counting--);
    // }, 1000);
  }, []);

  useEffect(() => {
    //  Listen to start game result
    socket.on("startGameRes", (res) => {
      if (!res.result) {
        alert("Start failed");
        navigate("/host");
        return;
      }
      console.log("start success");
      const quizId = params.get("quizId");
      navigate(`/gameBlock?quizId=${quizId}`);
    });

    //  Listen to countdown
    socket.on("startGameCountDown", (counting) => {
      setCount(counting);
    });
  }, []);

  return (
    <div>
      {count !== -1 && <p>{count}</p>}

      {count === -1 && <p>{host.gameName}</p>}
    </div>
  );
};

export default HostStartPage;
