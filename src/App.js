import "./App.scss";

import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import HostDisconnect from "./components/HostDisconnect/HostDisconnect";
import {
  LoginPage,
  RegisterPage,
  HomePage,
  HostPage,
  HostQuestionPage,
  HostQuestionDetailPage,
  HostScoreboardPage,
  HostWaiting,
  PlayerQuestionPage,
  PlayerWaitingPage,
  ForgotPassword
} from "./page";
import PlayerSummaryPage from "./page/PlayerPage/PlayerSummary";
import HostSummaryPage from "./page/HostPage/HostSummary";
import SocketReconnect from "./components/SocketReconnect/SocketReconnect";
import HostCreateQuizPage from "./page/HostPage/HostCreateQuiz";
import RequireAuth from "./components/RequireAuth/RequireAuth";
import { useDispatch } from "react-redux";
import { setReduxHost } from "./redux/reducers/hostReducer";
import { auth } from "./fire";

import { onAuthStateChanged } from "firebase/auth";
function App() {
  const dispatch = useDispatch();
  onAuthStateChanged(auth, (currentUser) => {

    if(currentUser?.displayName)
    {
      const host = {
        name: currentUser.displayName,
        email: currentUser.email,
        id: currentUser.uid,
        photoURL: currentUser.photoURL,
      };
    dispatch(setReduxHost(host));

    }
  
  });

  return (
    <div className="App">
      <Router>
        <HostDisconnect />
        <SocketReconnect />
        <Routes>
          <Route path="/" element={<HomePage />} />

          {/*Player route*/}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/waiting" element={<PlayerWaitingPage />} />
          <Route path="/question" element={<PlayerQuestionPage />} />
          <Route path="/summary" element={<PlayerSummaryPage />} />
          <Route path="/forgot" element={<ForgotPassword />} />

          {/*Host route*/}

          <Route
            path="/host"
            element={
              <RequireAuth>
                <HostPage />
              </RequireAuth>
            }
          />

          <Route
            path="/host/lobby"
            element={
              <RequireAuth>
                <HostWaiting />
              </RequireAuth>
            }
          />

          <Route
            path="/host/question"
            element={
              <RequireAuth>
                <HostQuestionPage />
              </RequireAuth>
            }
          />

          <Route
            path="/questionDetail"
            element={ 
            <HostQuestionDetailPage />

            }
          />

          <Route
            path="/host/scoreboard"
            element={
              <RequireAuth>
                <HostScoreboardPage />
              </RequireAuth>
            }
          />
          <Route
            path="/host/summary"
            element={
              <RequireAuth>
                <HostSummaryPage />
              </RequireAuth>
            }
          />
          <Route
            path="/host/create"
            element={
              <RequireAuth>
                <HostCreateQuizPage />
              </RequireAuth>
            }
          />
          <Route
            path="/host/edit"
            element={
              <RequireAuth>
                <HostCreateQuizPage />
              </RequireAuth>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
