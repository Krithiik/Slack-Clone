import React from "react";
import styled from "styled-components";
import { useState } from "react";
import { Button } from "@material-ui/core";
import { db, auth } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
function ChatInput({ channelName, channelId, chatRef }) {
  const [input, setInput] = useState("");
  const [user] = useAuthState(auth);
  const sendMessage = (e) => {
    e.preventDefault();
    if (!channelId || input === "") {
      return false;
    }
    // add messages subcollection to "rooms" collection with given channelId (doc)
    //path is set as rooms/{channelid} points to the specific channel in rooms collection
    //create a new collection called messages in the given path and add document
    addDoc(collection(db, `rooms/${channelId}`, "messages"), {
      message: input,
      timestamp: serverTimestamp(),
      user: user?.displayName,
      userImage: user?.photoURL,
    });

    //scroll to bottom on enter
    chatRef?.current?.scrollIntoView({
      behavior: "smooth",
    });

    setInput("");
  };

  return (
    <ChatInputContainer>
      <form action="">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={`Message # ${channelName}`}
        />

        <Button hidden type="submit" onClick={sendMessage}>
          SEND
        </Button>
      </form>
    </ChatInputContainer>
  );
}

export default ChatInput;

const ChatInputContainer = styled.div`
  border-radius: 20px;

  > form {
    position: relative;
    display: flex;
    justify-content: center;
  }

  > form > input {
    position: fixed;
    bottom: 30px;
    width: 60%;
    border: 1px solid gray;
    border-radius: 3px;
    padding: 20px;
    outline: none;
  }
  > form > button {
    display: none !important;
  }
`;
