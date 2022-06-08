import './App.scss';

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import HostDisconnect from './components/HostDisconnect/HostDisconnect';
import {
  HomePage,
  HostPage,
  HostQuestionPage,
  HostStartPage,
  HostWaiting,
  PlayerQuestionPage,
  PlayerQuestionResultPage,
  PlayerStartPage,
  PlayerWaitingPage,
} from './page';

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
          <Route path="/question" element={<PlayerQuestionPage />}></Route>
          <Route
            path="/question/result"
            element={<PlayerQuestionResultPage />}
          ></Route>
          {/*Host route*/}
          <Route path="/host" element={<HostPage />}></Route>
          <Route path="/host/lobby" element={<HostWaiting />}></Route>
          <Route path="/host/start" element={<HostStartPage />}></Route>
          <Route path="/host/question" element={<HostQuestionPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
