import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import StartBorderOutlineIcon from "@material-ui/icons/StarBorderOutlined";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import { useSelector } from "react-redux";
import { selectRoomId } from "../features/appSlice";
import { useCollection, useDocument } from "react-firebase-hooks/firestore";
import { collection, doc, query, orderBy } from "firebase/firestore";
import { db } from "../firebase";
import ChatInput from "./ChatInput";
import Message from "./Message";

function Chat() {
  const chatRef = useRef(null);
  const chRef = useRef(null);
  const channelId = useSelector(selectRoomId);
  const [channelDetails] = useDocument(
    channelId && doc(db, `rooms/${channelId}`)
  );
  const [channelMessages, loading] = useCollection(
    channelId &&
      query(
        collection(db, `rooms/${channelId}/messages`),
        orderBy("timestamp", "asc")
      )
  );

  useEffect(() => {
    chatRef?.current?.scrollIntoView();
  }, [channelId, loading]);

  return (
    <ChatContainer ref={chRef}>
      {channelDetails && channelMessages && (
        <>
          <Header>
            <HeaderLeft>
              <h4>
                <strong>#{channelDetails?.data().channelName}</strong>
              </h4>
              <StartBorderOutlineIcon />
            </HeaderLeft>

            <HeaderRight>
              <p>
                <InfoOutlinedIcon />
                Details
              </p>
            </HeaderRight>
          </Header>

          <ChatMessages>
            {channelMessages?.docs.map((doc) => {
              const {
                message,
                timestamp,
                user,
                userImage,
                imageUrl,
                fileType,
              } = doc.data();
              return (
                <Message
                  key={doc.id}
                  message={message}
                  timestamp={timestamp}
                  user={user}
                  userImage={userImage}
                  imageUrl={imageUrl}
                  fileType={fileType}
                />
              );
            })}
            <ChatBottom ref={chatRef} />
          </ChatMessages>
          <ChatInput
            chatRef={chatRef}
            channelId={channelId}
            channelName={channelDetails?.data()?.channelName}
          />
        </>
      )}
    </ChatContainer>
  );
}

export default Chat;

const ChatContainer = styled.div`
  flex: 0.7;
  flex-grow: 1;
  overflow-y: scroll;
  margin-top: 60px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;
  border-bottom: 1px solid lightgray;
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  > h4 {
    display: flex;
    text-transform: lowercase;
    margin-right: 10px;
  }
  > h4 > .MuiSvgIcon-root {
    margin-left: 10px;
    font-size: 18px;
  }
`;

const HeaderRight = styled.div`
  > p {
    display: flex;
    align-items: center;
    font-size: 14px;
  }
  > p > .MuiSvgIcon-root {
    margin-right: 5px !important;
    font-size: 16px;
  }
`;

const ChatMessages = styled.div``;

const ChatBottom = styled.div`
  padding-bottom: 235px;
`;
