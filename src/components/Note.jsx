import { Box, Grid, Card, CardContent, Typography,Button,CardMedia, IconButton} from "@mui/material";
import React from "react";
import "../css/extstyle.css";
import { useSelector } from "react-redux";
import NoteIcons from "./noteIcons";
import { useState } from "react";
import Popup from "./popUp";
import { Snackbar } from "@mui/material";
import "../css/extstyle.css";
import noteService from "../service/noteService";
import { useDispatch } from "react-redux";
import { restoreFromTrash } from "../actions/noteActions";
import CloseIcon from "@mui/icons-material/Close";



const Note = () => {
  const myNotes = useSelector((state) => state.allNotes.filteredNotes); 
  const [hover, setHover] = useState([myNotes.map((notes)=>false)]);
  const [isOpen, setIsOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const [updateData, setUpdateData] = useState({});
  const listView = useSelector((state) => state.allNotes.listView);
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

  const handleUpdate = (item, index) => {
    let data = {
      index: index,
      item: item,
    };
    setUpdateData(data);
    setIsOpen(!isOpen);
  };


  const handleClose = (item) => {
    setIsOpen(!isOpen);
  };

  const handleRestore = () => {
    let data = {
      ...undoItem,
      trash: false,
      cardId:undoItem._id,
    };
    noteService
      .updateNotes(data)
      .then((res) => {
        if (res.status === 200) {
          console.log(res);
          dispatch(restoreFromTrash(res.data));
        } else {
          console.log(res);
        }
      })
      .catch((err) => console.log(err.message));
  };


  const action = (
    <>
      <Button size="small" onClick={handleRestore} style={{ color: "yellow" }}>
        UNDO
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleCloseSnackBar}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </>
  );

  return (
    <Box className="main-container">
      <Grid container spacing={3} justifyContent={listView ? "center" : null}>
        {myNotes.map((item,index) => {
          return (
            <Grid item xs={12}  md={listView ? 8 : 3} key={item._id}>
              <Card
              onMouseOver={() => {
                let x=[...hover];
                x[index]=true
                setHover(x);
              }}
              onMouseLeave={() => {
                let x=[...hover]
                x[index]=false
                setHover(x);
              }}
              style={{borderRadius:"5px",background: item.color}}
              >
                <CardContent
                onClick={() => handleUpdate(item, index)}
                >
                  {item.imgFile!=="" ? <CardMedia
                    component="img"
                    height="150px"
                    image={`http://localhost:4000/images/${item.imgFile}`}
                    alt="dish"
                  />:null}
                  <Typography variant="h5">{item.title}</Typography>
                  <Typography style={{
                      overflow: "hidden",
                      whiteSpace: "normal",
                      height: "2.8em",
                      textOverflow: "-o-ellipsis-lastline",
                    }} color="text.secondary"
                    className="item-content">
                    {item.content}
                  </Typography>
                </CardContent>
                {hover[index] ? <NoteIcons id={item._id} title={item.title} content={item.content} colors={item.color} handleOpenSnackBar={handleOpenSnackBar}/> :<div style={{ height:"40px" }}></div>}
              </Card>
            </Grid>
          );
        })}
      </Grid>
      {isOpen && <Popup handleClose={handleClose} item={updateData} />}
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleCloseSnackBar}
        message="Note Trashed"
        action={action}
      />
    </Box>
  );
};

export default Note;