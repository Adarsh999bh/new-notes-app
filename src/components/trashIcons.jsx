import * as React from "react";
import { Grid } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { RestoreFromTrashOutlined } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import noteService from "../service/noteService";
import { restoreFromTrash, deleteFromTrash } from "../actions/noteActions";
export default function TrashIcons(props) {
    const dispatch=useDispatch();

    const restoreHandler=()=>{
        let data={
            cardId:props.id,
            title:props.title,
            content:props.content,
            color:props.colors,
            trash:false,
        }
        noteService.updateNotes(data)
        .then(response=>{
            if (response.status === 200) {
                dispatch(restoreFromTrash(response.data));
                props.handleOpenSnackBar(response.data);
              }
              else{
                console.log("error occured while restoring from trash");
            }
        })
        .catch(err=>{
            console.log(err);
        });
    }
    const deleteHandler=()=>{
      let data={
        cardId:props.id,
        title:props.title,
        content:props.content,
        color:props.colors,
        trash:false,
    }
      props.handleDilougOpen(data)
    }

  return (
    <div>
      <Grid>
        <IconButton size="small" title="Restore" color="default" sx={{ padding: "8px" }} onClick={()=>{restoreHandler()}}>
          <RestoreFromTrashOutlined/>
        </IconButton>
        <IconButton size="small" title="Delete" color="default" sx={{ padding: "8px" }} onClick={()=>{deleteHandler()}}>
          <DeleteOutlineOutlinedIcon/>
        </IconButton>
      </Grid>
    </div>
  );
}