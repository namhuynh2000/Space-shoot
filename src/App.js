import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {
  HomePage,
  HostWaiting,
  HostPage,
  PlayerWaitingPage,
  HostStartPage,
  PlayerStartPage,
} from "./page";
import HostDisconnect from "./components/HostDisconnect/HostDisconnect";

function App() {
  return (
    <div className="App">
      <Router>
        <HostDisconnect />

        <Routes>
          {/*Player route*/}
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/waiting" element={<PlayerWaitingPage />}></Route>
          <Route path="/start" element={<PlayerStartPage />}></Route>

          {/*Host route*/}
          <Route path="/host" element={<HostPage />}></Route>
          <Route path="/host/lobby" element={<HostWaiting />}></Route>
          <Route path="/host/start" element={<HostStartPage />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
