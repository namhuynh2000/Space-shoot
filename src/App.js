import "./App.scss";

import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import HostDisconnect from "./components/HostDisconnect/HostDisconnect";
import {
  HomePage,
  HostPage,
  HostQuestionPage,
  HostScoreboardPage,
  HostWaiting,
  PlayerQuestionPage,
  PlayerWaitingPage,
} from "./page";
import PlayerSummaryPage from "./page/PlayerPage/PlayerSummary";
import HostSummaryPage from "./page/HostPage/HostSummary";
import SocketReconnect from "./components/SocketReconnect/SocketReconnect";
function App() {
  return (
    <div className="App">
      <Router>
        <HostDisconnect />
        <SocketReconnect />
        <Routes>
          {/*Player route*/}
          <Route path="/" element={<HomePage />} />
          <Route path="/waiting" element={<PlayerWaitingPage />} />
          <Route path="/question" element={<PlayerQuestionPage />} />
          <Route path="/summary" element={<PlayerSummaryPage />} />

          {/*Host route*/}
          <Route path="/host" element={<HostPage />} />
          <Route path="/host/lobby" element={<HostWaiting />} />
          <Route path="/host/question" element={<HostQuestionPage />} />
          <Route path="/host/scoreboard" element={<HostScoreboardPage />} />
          <Route path="/host/summary" element={<HostSummaryPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
