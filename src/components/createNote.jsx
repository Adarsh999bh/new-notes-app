import React, { useState } from "react";
import { Paper, InputBase, Button, Grid } from "@mui/material";
import service from "../service/noteService";
import { useDispatch } from "react-redux";
import { addNewNote } from "../actions/noteActions";

const CreateNote = () => {
  const [click, setClick] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const dispatch = useDispatch();

  const handleAddNotes = () => {
    let data = {
      title: title,
      content: content,
      color:"rgb(255, 255, 255)",
      trash:false
    };
    service
      .createNotes(data)
      .then((res) => {
        if (res.status === 200) {
          dispatch(addNewNote(res.data))
          document.getElementsByName("title")[0].value="";
          setClick(false);
        } else {
          console.log(res);
        }
      })
      .catch((err) => console.log(err));
  };

  const handleClose = () => {
    setTitle("");
    setContent("");
    setClick(false);
  }

  return (
    <Paper className="add-note-container" elevation={5} style={{width:"500px",marginLeft:"300px", borderRadius:"10px"}}>
      <InputBase
        id="note-title"
        type="text"
        placeholder={click ? "Title" : "Take a note..."}
        fullWidth
        name="title"
        inputProps={{
          style: { height: "36px", paddingLeft:"40px",fontSize:"20px"},
        }}
        onFocus={() => setClick(true)}
        onChange={(e) => setTitle(e.target.value)}
      />
      {click && (
        <Grid container>
          <Grid item xs={12}>
            <InputBase
              id="note-content"
              type="text"
              placeholder="Take a note..."
              fullWidth
              multiline={true}
              inputProps={{
                style: { minHeight: "36px",paddingLeft:"50px"},
              }}
              onChange={(e) => setContent(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} align="right">
            <Button
              id="note-submit"
              style={{ color: "black", textTransform: "none" }}
              onClick={handleAddNotes}
            >
              Submit
            </Button>
            <Button
              id="close"
              style={{ color: "black", textTransform: "none" }}
              onClick={handleClose}
            >
              Close
            </Button>
          </Grid>
        </Grid>
      )}
    </Paper>
  );
};
export default CreateNote;