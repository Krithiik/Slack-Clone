import React from "react";
import styled from "styled-components";
import { Button } from "@material-ui/core";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { getFirestore, setDoc, doc } from "firebase/firestore";
import { getAuth } from "firebase/auth";

function Login() {
  const signIn = async (e) => {
    e.preventDefault();
    await signInWithPopup(auth, provider).catch((error) => {
      console.log(error);
    });
    saveMessagingDeviceToken();
  };

  //get device token and store in firestore for notification.
  async function saveMessagingDeviceToken() {
    try {
      const currentToken = await getToken(getMessaging());
      if (currentToken) {
        console.log("Got FCM device token:", currentToken);
        // Saving the Device Token to Cloud Firestore.
        const tokenRef = doc(getFirestore(), "fcmTokens", currentToken);
        await setDoc(tokenRef, { uid: getAuth().currentUser.uid });

        // This will fire when a message is received while the app is in the foreground.
        // When the app is in the background, firebase-messaging-sw.js will receive the message instead.
        onMessage(getMessaging(), (message) => {
          console.log(
            "New foreground notification from Firebase Messaging!",
            message.notification
          );
        });
      } else {
        // Need to request permissions to show notifications.
        requestNotificationsPermissions();
      }
    } catch (error) {
      console.error("Unable to get messaging token.", error);
    }
  }

  async function requestNotificationsPermissions() {
    console.log("Requesting notifications permission...");
    const permission = await Notification.requestPermission();

    if (permission === "granted") {
      console.log("Notification permission granted.");
      // Notification permission granted.
      await saveMessagingDeviceToken();
    } else {
      console.log("Unable to get permission to notify.");
    }
  }

  return (
    <LoginContainer>
      <LoginInnerContainer>
        <img
          src="https://cdn.mos.cms.futurecdn.net/SDDw7CnuoUGax6x9mTo7dd.jpg"
          alt=""
        />
        <h1>Sign into Slack</h1>
        <Button onClick={signIn}>Sign in with Google</Button>
      </LoginInnerContainer>
    </LoginContainer>
  );
}

export default Login;

const LoginContainer = styled.div`
  background-color: var(--slack-color);
  height: 100vh;
  display: grid;
  place-items: center;
`;
const LoginInnerContainer = styled.div`
  padding: 100px;
  text-align: center;
  background-color: white;
  border-radius: 10px;
  > img {
    object-fit: contain;
    height: 100px;
    margin-bottom: 40px;
  }

  > button {
    margin-top: 50px;
    text-transform: inherit !important;
    background-color: #0a8d48 !important;
    color: white;
  }
`;
