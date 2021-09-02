import { Divider, Dialog, Button, Zoom } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import { defaultPost } from "../../data";
import { useOptionsDialogStyles } from "../../styles";

function OptionsDialog({ onClose }) {
  const classes = useOptionsDialogStyles();

  return (
    <Dialog
      open
      classes={{
        scrollPaper: classes.dialogScrollPaper
      }}
      onClose={onClose}
      TransitionComponent={Zoom}
    >
      <Button className={classes.redButton}>
        Unfollow
      </Button>
      <Divider />
      <Button className={classes.button}>
        <Link to={`/p/${defaultPost.id}`}>
          Go to post
        </Link>
      </Button>
      <Divider />
      <Button className={classes.button}>
        <Link to={`/p/${defaultPost.id}`}>
          Share
        </Link>
      </Button>
      <Divider />
      <Button className={classes.button}>
        <Link to={`/p/${defaultPost.id}`}>
          Copy link
        </Link>
      </Button>
      <Divider />
      <Button onClick={onClose} className={classes.button}>
        <Link to={`/p/${defaultPost.id}`}>
          Cancel
        </Link>
      </Button>
    </Dialog>
  )
}

export default OptionsDialog;
