import React from 'react';
import { Box, Grid, Card, CardContent, Typography, CardMedia, Button, IconButton, Tooltip, Dialog, DialogActions, DialogContent, DialogContentText } from "@mui/material";
import "../css/extstyle.css";
import { useSelector } from "react-redux";
import { useState } from "react";
import TrashIcons from './trashIcons';
import "../css/extstyle.css";
import { Snackbar } from "@mui/material";
import noteService from '../service/noteService';
import { addTrashNotes,emptyTrash} from '../actions/noteActions';
import { useDispatch } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";
import { deleteFromTrash } from '../actions/noteActions';



const Trash = () => {

  const trashNotes = useSelector((state) => state.allNotes.trashNotes);
  const [hover, setHover] = useState([trashNotes.map((notes) => false)]);
  const listView = useSelector((state) => state.allNotes.listView);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const [deleteItem, setDeleteItem] = useState("");
  const [dialougOpen, setDialougOpen] = useState(false);

  const handleDilougOpen = (item) => {
    setDeleteItem(item);
    setDialougOpen(true);
  };

  const handleDialogClose = () => {
    setDialougOpen(false);
  };

  const [undoItem, setundoItem] = useState("");
  const handleOpenSnackBar = (item) => {
    setOpen(true);
    setundoItem(item);
  };
  const handleCloseSnackBar = (reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleUndoTrash = () => {
    let data = {
      ...undoItem,
      trash: true,
      cardId: undoItem._id,
    };
    noteService
      .updateNotes(data)
      .then((res) => {
        if (res.status === 200) {
          dispatch(addTrashNotes(res.data));
          handleCloseSnackBar();
        } else {
          console.log(res);
        }
      })
      .catch((err) => console.log(err.message));
  };

  const handleDelete = () => {
    noteService
      .deleteNotes({ cardId: deleteItem.cardId })
      .then((res) => {
        if (res.status === 200) {
          dispatch(deleteFromTrash(res.data));
          handleDialogClose();
        } else {
          console.log(res);
        }
      })
      .catch((err) => console.log(err));
  };

  const handleEmptyTrash=()=>{
    trashNotes.map((item)=>{
      noteService
      .deleteNotes({cardId:item._id})
      .then((res)=>{
        console.log();
      })
      .catch((err)=>{
        console.log(err);
      })
    })
    dispatch(emptyTrash());
  }

  const action = (
    <React.Fragment>
      <Button
        size="small"
        onClick={handleUndoTrash}
        style={{ color: "yellow" }}
      >
        UNDO
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleCloseSnackBar}
      >
        <Tooltip title="Close">
          <CloseIcon fontSize="small" />
        </Tooltip>
      </IconButton>
    </React.Fragment>
  );
  return (
    <Box className="main-container">
      <Typography
        style={{ fontStyle: "italic", marginBottom: "20px", fontSize: "17px" }}
      >
        Notes in Trash are deleted after 7 days.
        <Button onClick={handleEmptyTrash}>Empty Trash</Button>
      </Typography>
      <Grid container spacing={4} justifyContent={listView ? "center" : null}>
        {trashNotes.map((item, index) => {
          return (
            <Grid item xs={12} md={listView ? 8 : 3} key={item._id}>
              <Card
                onMouseOver={() => {
                  let x = [...hover];
                  x[index] = true
                  setHover(x);
                }}
                onMouseLeave={() => {
                  let x = [...hover]
                  x[index] = false
                  setHover(x);
                }}
                style={{ borderRadius: "5px", background: item.color }}
              >
                <CardContent>
                  {item.imgFile !== "" ? <CardMedia
                    component="img"
                    image={`http://localhost:4000/images/${item.imgFile}`}
                    alt="dish"
                  /> : null}
                  <Typography variant="h5">{item.title}</Typography>
                  <Typography className="item-content" sx={{ mb: 1.5 }} color="text.secondary">
                    {item.content}
                  </Typography>
                </CardContent>
                {hover[index] ? (<TrashIcons id={item._id} title={item.title} content={item.content} colors={item.color} handleOpenSnackBar={handleOpenSnackBar} handleDilougOpen={handleDilougOpen} />) : (
                  <div style={{ height: "40px" }}></div>
                )}
              </Card>
            </Grid>
          );
        })}
      </Grid>
      <Dialog open={dialougOpen} onClose={handleDialogClose}>
        <DialogContent>
          <DialogContentText style={{ width: "32vw" }}>
            Delete note forever?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleDialogClose}
            style={{ color: "black", textTransform: "none" }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleDelete}
            autoFocus
            style={{ textTransform: "none" }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleCloseSnackBar}
        message="Note Trashed"
        action={action}
      />
    </Box>
  );
}

export default Trash
