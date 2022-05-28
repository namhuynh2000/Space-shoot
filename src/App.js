import "./App.css";
import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import { HomePage, PlayerListPage, HostPage, PlayerWaitingPage } from "./page";
import HostDisconnect from "./components/HostDisconnect/HostDisconnect";
function App() {
  return (
    <div className="App">
      <Router>
        <HostDisconnect />

        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/waiting" element={<PlayerWaitingPage />}></Route>
          <Route path="/host" element={<HostPage />}></Route>
          <Route path="/host/lobby/:room" element={<PlayerListPage />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
