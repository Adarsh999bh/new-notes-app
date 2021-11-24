import * as React from "react";
import { Grid } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import AddAlertOutlinedIcon from "@mui/icons-material/AddAlertOutlined";
import PersonAddOutlinedIcon from "@mui/icons-material/PersonAddOutlined";
import ColorLensOutlinedIcon from "@mui/icons-material/ColorLensOutlined";
import InsertPhotoOutlinedIcon from "@mui/icons-material/InsertPhotoOutlined";
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { addTrashNotes } from "../actions/noteActions";
import noteService from "../service/noteService";
export default function NoteIcons(props) {
    const dispatch = useDispatch();
    const myNotes = useSelector((state) => state.allNotes.filteredNotes);
    const onClickHandler=()=>{
        console.log("moved to trash",props.id);
        let data={
            cardId:props.id,
            title:props.title,
            content:props.content,
            trash:true,
        }
        noteService.updateNotes(data)
        .then(response=>{
            if (response.status === 200) {
              dispatch(addTrashNotes(response.data));
            }
            else{
              console.log("error occured while moving to trash");
            }
        })
        .catch(err=>{
            console.log(err);
        })

    }
  return (
    <div>
      <Grid>
        <IconButton size="small" color="default" sx={{ padding: "9px" }}>
          <AddAlertOutlinedIcon />
        </IconButton>
        <IconButton size="small" color="default" sx={{ padding: "9px" }}>
          <PersonAddOutlinedIcon />
        </IconButton>
        <IconButton size="small" color="default" sx={{ padding: "9px" }}>
          <ColorLensOutlinedIcon />
        </IconButton>
        <IconButton size="small" color="default" sx={{ padding: "9px" }}>
          <InsertPhotoOutlinedIcon />
        </IconButton>
        <IconButton size="small" onClick={()=>{onClickHandler()}} color="default" sx={{ padding: "8px" }}>
          <DeleteOutlineOutlinedIcon/>
        </IconButton>
      </Grid>
    </div>
  );
}