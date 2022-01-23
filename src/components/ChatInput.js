import React, { useEffect } from "react";
import styled from "styled-components";
import { useState } from "react";
import { Button, TextField } from "@material-ui/core";
import { db, auth } from "../firebase";
import {
  collection,
  addDoc,
  serverTimestamp,
  getFirestore,
  updateDoc,
} from "firebase/firestore";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { useAuthState } from "react-firebase-hooks/auth";
import ImageIcon from "@material-ui/icons/Image";
function ChatInput({ channelName, channelId, chatRef }) {
  const [input, setInput] = useState("");
  const [image, setImage] = useState(null);
  const [user] = useAuthState(auth);
  var LOADING_IMAGE_URL = "https://www.google.com/images/spin-32.gif?a";

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

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

  const sendImageMessage = async (e) => {
    e.preventDefault();
    try {
      const messageRef = await addDoc(
        collection(db, `rooms/${channelId}`, "messages"),
        {
          imageUrl: LOADING_IMAGE_URL,
          timestamp: serverTimestamp(),
          user: user?.displayName,
          userImage: user?.photoURL,
          message: input,
        }
      );

      const filePath = `${user.uid}/${messageRef.id}/${image.name}}`;
      const newImageRef = ref(getStorage(), filePath);
      const fileSnapShot = await uploadBytesResumable(newImageRef, image);
      const publicImageUrl = await getDownloadURL(newImageRef);
      await updateDoc(messageRef, {
        imageUrl: publicImageUrl,
        storageUri: fileSnapShot.metadata.fullPath,
      });
      setImage(null);
      setInput("");
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(image);
    if (image !== null) {
      sendImageMessage(e);
    } else {
      sendMessage(e);
    }
  };

  return (
    <ChatInputContainer>
      <form action="">
        <input
          value={input}
          id="textInput"
          onChange={(e) => setInput(e.target.value)}
          placeholder={`Message # ${channelName}`}
        />
        <p>{image?.name}</p>
        <Button class="fileButton" variant="contained" component="label">
          <ImageIcon />
          <input type="file" hidden onChange={handleFileChange} />
        </Button>

        <Button hidden type="submit" onClick={(e) => handleSubmit(e)}>
          SEND
        </Button>
      </form>
    </ChatInputContainer>
  );
}

export default ChatInput;

const ChatInputContainer = styled.div`
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  > form {
    display: flex;
    justify-content: center;
    position: fixed;
    bottom: 30px;
    width: 60%;
    border: 1px solid gray;
    border-radius: 3px;
    padding: 20px;
    background-color: white;
  }
  #textInput {
    outline: none;
    flex: 1;
    border-top-style: hidden;
    border-right-style: hidden;
    border-left-style: hidden;
    border-bottom-style: hidden;
  }
  > form > button {
    display: none !important;
  }
`;
