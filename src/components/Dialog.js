import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import { useState } from "react";
function DialogChannelNameInput({ open, handleClose, addChannel }) {
  const [channelName, setChannelName] = useState(null);
  const handleSubmit = () => {
    addChannel(channelName);
    setChannelName(null);
    handleClose();
  };
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Name your Channel !!</DialogTitle>
        <DialogContent>
          <DialogContentText style={{ fontWeight: "bolder" }}>
            Please enter the name for the channel
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Channel name"
            type="text"
            fullWidth
            variant="standard"
            autoComplete="off"
            onChange={(e) => setChannelName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button
            variant="contained"
            type="submit"
            color="primary"
            onClick={handleSubmit}
          >
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default DialogChannelNameInput;
