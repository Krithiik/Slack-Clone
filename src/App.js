import React, { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./components/Header";
import styled from "styled-components";
import Sidebar from "./components/Sidebar";
import Chat from "./components/Chat";
import Login from "./components/Login";
import Notification from "./components/Notificaiton";
import { auth } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import Spinner from "react-spinkit";
import { getMessaging, onMessage } from "firebase/messaging";

function App() {
  // adds the user info into user state
  const [user, loading] = useAuthState(auth);
  const [showNotification, setShowNotification] = useState(false);
  const [notification, setNotification] = useState({
    title: "",
    body: "",
    img: "",
  });
  //fetch message and set notification
  onMessage(getMessaging(), (message) => {
    console.log(
      "New foreground notification from Firebase Messaging!",
      message.notification
    );
    setNotification({
      title: message.notification.title,
      body: message.notification.body,
      img: message.notification.image,
    });
    setShowNotification(true);
  });

  if (loading) {
    return (
      <AppLoading>
        <AppLoadingContent>
          <img
            src="https://cdn.mos.cms.futurecdn.net/SDDw7CnuoUGax6x9mTo7dd.jpg"
            alt=""
          />
          <Spinner name="ball-scale-ripple" />
        </AppLoadingContent>
      </AppLoading>
    );
  }
  return (
    <div className="App">
      <Router>
        {!user ? (
          <Login />
        ) : (
          <>
            <Header />
            <AppBody>
              <Sidebar />
              <Switch>
                <Route path="/" exact>
                  <Chat />
                </Route>
              </Switch>
            </AppBody>
          </>
        )}
      </Router>
      {showNotification ? (
        <Notification
          notification={notification}
          show={showNotification}
          setShow={setShowNotification}
          setNotification={setNotification}
        />
      ) : (
        <></>
      )}
    </div>
  );
}

export default App;

const AppBody = styled.div`
  display: flex;
  height: 100vh;
`;

const AppLoading = styled.div`
  display: grid;
  place-items: center;
  background-color: var(--slack-color);
  height: 100vh;
  width: 100%;
`;
const AppLoadingContent = styled.div`
  text-align: center;
  padding-bottom: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: white;
  border-radius: 10px;
  > img {
    height: 100px;
    padding: 20px;
    margin-bottom: 40px;
  }
`;
