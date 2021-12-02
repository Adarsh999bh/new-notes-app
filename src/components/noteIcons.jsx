import * as React from "react";
import { Grid } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import ColorLensOutlinedIcon from "@mui/icons-material/ColorLensOutlined";
import InsertPhotoOutlinedIcon from "@mui/icons-material/InsertPhotoOutlined";
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { useDispatch } from "react-redux";
import { addTrashNotes, updateNote } from "../actions/noteActions";
import noteService from "../service/noteService";
import CircleIcon from "@mui/icons-material/Circle";
import { Tooltip, Paper, Popover, } from "@mui/material";
import { useState } from "react";

const colorPaletteClassName = [
  {
    colorCode: "rgb(255, 255, 255)",
    colorName: "White"
  },
  {
    colorCode: "rgb(242, 139, 130)",
    colorName: "Red"
  },
  {
    colorCode: "rgb(215, 174, 251)",
    colorName: "Purple"
  },
  {
    colorCode: "rgb(255, 192, 203)",
    colorName: "Pink"
  },

  {
    colorCode: "rgb(167, 255, 235)",
    colorName: "Teal"
  },
  {
    colorCode: "rgb(251, 188, 4)",
    colorName: "Orange"
  },
  {
    colorCode: "rgb(174, 203, 250)",
    colorName: "Dark Blue"
  },
  {
    colorCode: "rgb(232, 234, 237)",
    colorName: "Gray"
  },
  {
    colorCode: "rgb(203, 240, 248)",
    colorName: "Blue"
  },
  {
    colorCode: "rgb(230, 201, 168)",
    colorName: "Brown"
  },
  {
    colorCode: "rgb(255, 255, 0)",
    colorName: "Yellow"
  },
  {
    colorCode: "rgb(204, 255, 144)",
    colorName: "Green"
  }
]

export default function NoteIcons(props) {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const onClickHandler = () => {
    let data = {
      cardId: props.id,
      title: props.title,
      content: props.content,
      color: props.colors,
      trash: true,
    }
    noteService.updateNotes(data)
      .then(response => {
        if (response.status === 200) {
          dispatch(addTrashNotes(response.data));
          props.handleOpenSnackBar(response.data);
        }
        else {
          console.log("error occured while moving to trash");
        }
      })
      .catch(err => {
        console.log(err);
      })

  }


  const handleImage = (image) => {
    let data = {
      cardId: props.id,
      title: props.title,
      content: props.content,
      color: props.colors,
      trash: true,
      image: image,
    };
    noteService
      .updateNotes(data)
      .then((res) => {
        if (res.status === 200) {
          dispatch(updateNote(res.data));
          console.log(res);
        } else {
          console.log(res);
        }
      })
      .catch((err) => console.log(err));
  };

  const fileHandler = (event) => {
    console.log(event.target.files[0]);
    const fd = new FormData();
    fd.append("image", event.target.files[0], event.target.files[0].name);
    console.log(fd,"in noteicons");
    noteService
      .setImage(fd)
      .then((res) => {
        if(res.status===200){
          console.log(res);
          handleImage(res.data.filename);
          
        }
        else{
          console.log(res);
        }
      })
      .catch((err) => console.log(err,"asa"));
  };


  const handleColor = (bgColor) => {
    let data = {
      cardId: props.id,
      title: props.title,
      content: props.content,
      trash: false,
      color: bgColor,
    };
    noteService
      .updateNotes(data)
      .then((res) => {
        if (res.status === 200) {
          dispatch(updateNote(res.data));
          handlePopClose();
          console.log(res);
        } else {
          console.log(res);
        }
      })
      .catch((err) => console.log(err.message));
  };

  const handlePopClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  return (
    <div style={{ display: "flex", justifyContent: "space-around" }}>
      <Grid>
        <IconButton size="small" color="default" onClick={handlePopClick} id="color-btn">
          <ColorLensOutlinedIcon />
        </IconButton>
        <input
          style={{ display: "none" }}
          id="raised-button-file"
          type="file"
          onChange={fileHandler}
        />
        <label htmlFor="raised-button-file">
          <Tooltip title="Upload Image">
            <IconButton component="span">
              <InsertPhotoOutlinedIcon />
            </IconButton>
          </Tooltip>
        </label>
        <IconButton size="small" title="Trash" onClick={() => { onClickHandler() }} color="default">
          <DeleteOutlineOutlinedIcon />
        </IconButton>
      </Grid>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handlePopClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left"
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "left"
        }}
      >
        <Paper>
          <Grid container sx={{ p: 1 }}>
            {colorPaletteClassName.map(({ colorCode, colorName }, index) => {
              return (
                <Grid item xs={3} key={index} style={{ width: "10px" }}>
                  <Tooltip title={colorName}>
                    <IconButton onClick={() => handleColor(colorCode)} id={index}>
                      <CircleIcon style={{ color: colorCode }} />
                    </IconButton>
                  </Tooltip>
                </Grid>
              );
            })}
          </Grid>
        </Paper>
      </Popover>
    </div>
  );
}