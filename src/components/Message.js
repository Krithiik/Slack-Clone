import React from "react";
import styled from "styled-components";
import FileCopyIcon from "@material-ui/icons/FileCopy";

function Message({ message, timestamp, user, userImage, imageUrl, fileType }) {
  return (
    <MessageContainer>
      <img src={userImage} alt="" />
      <MessageInfo>
        <h4>
          {user} <span>{new Date(timestamp?.toDate()).toUTCString()}</span>
        </h4>
        <p>{message}</p>
        {imageUrl &&
        (fileType === "jpg" ||
          fileType === "jpeg" ||
          fileType === "png" ||
          fileType === "gif") ? (
          <img src={imageUrl} alt="" />
        ) : (
          imageUrl && (
            <a href={imageUrl}>
              <FileCopyIcon />
              Shared a file
            </a>
          )
        )}
      </MessageInfo>
    </MessageContainer>
  );
}

export default Message;

const MessageContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 20px;
  > img {
    height: 40px;
    width: 40px;
    border-radius: 8px;
  }
`;
const MessageInfo = styled.div`
  padding-left: 10px;
  > h4 > span {
    color: gray;
    font-weight: 300;
    margin-left: 4px;
    font-size: 10px;
  }
  > img {
    max-width: 70%;
    height: auto;
    @media (min-width: 1000px) {
      max-width: 489px;
    }
  }
  > p {
    margin: 10px 5px;
  }
  > a {
    color: var(--slack-color);
    text-decoration: none;
  }
`;
