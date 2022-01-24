import React from "react";
import { useState } from "react";
import styled from "styled-components";
import { roomsCollectionRef } from "../firebase";
import { addDoc } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { enterRoom } from "../features/appSlice";
import DialogChannelNameInput from "./Dialog";

function SidebarOption({ Icon, title, addChannelOption, id }) {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const openDialog = () => {
    handleOpen();
  };

  const addChannel = async (channelName) => {
    if (channelName) {
      await addDoc(roomsCollectionRef, { channelName });
    }
  };

  const selectChannel = () => {
    if (id) {
      dispatch(
        enterRoom({
          roomId: id,
        })
      );
    }
  };
  return (
    <>
      <SidebarOptionContainer
        onClick={addChannelOption ? openDialog : selectChannel}
      >
        {Icon && <Icon fontSize="small" style={{ padding: 10 }} />}
        {Icon ? (
          <h3>{title}</h3>
        ) : (
          <SidebarOptionChannel>
            <div style={{ paddingLeft: "10px" }}>
              <span>#</span> {title}
            </div>
          </SidebarOptionChannel>
        )}
      </SidebarOptionContainer>
      {open && (
        <DialogChannelNameInput
          open={open}
          handleClose={handleClose}
          addChannel={addChannel}
        />
      )}
    </>
  );
}

export default SidebarOption;

const SidebarOptionContainer = styled.div`
  display: flex;
  font-size: 12px;
  align-items: center;
  padding-left: 2px;

  cursor: pointer;
  :hover {
    opacity: 0.9;
    background-color: #340e36;
  }
  > h3 {
    font-weight: 500;
  }

  > h3 > span {
    padding: 10px;
  }
`;
const SidebarOptionChannel = styled.h3`
  padding: 10px 0;
  font-weight: 300;
`;
