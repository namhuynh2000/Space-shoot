import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { JoinGamePage, PlayerListPage } from "./page";
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<JoinGamePage />}></Route>
          <Route path="/host" element={<PlayerListPage />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
