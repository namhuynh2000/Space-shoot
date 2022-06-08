import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';

import socket from  "../../../connections/socket"
import { selectHost } from '../../../redux/reducers/hostReducer';

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
      navigate(`/host/question?quizId=${quizId}&question=1`);
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
