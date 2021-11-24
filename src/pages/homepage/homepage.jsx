import Sidebar from "../../components/SideBar";
import PrimarySearchAppBar from "../../components/AppBar";
import Note from "../../components/Note";
import NoteService from '../../service/noteService';
import React, { useState} from "react";
import { Box } from "@mui/system";
import { useDispatch } from "react-redux";
import { setNotes,setTrashNotes } from "../../actions/noteActions";
import { useEffect } from "react";
import CreateNote from "../../components/createNote";
import Trash from "../../components/trash";

const Homepage = () => {
    const [open, setOpen] = useState(false);
    const [title,setTitle] = useState('Fundoo Note');
    const [sidebarIndex,setSidebarIndex]=useState(0);
    const dispatch = useDispatch()
    const handleTitle = (title,sideIndex) => {
        setTitle(title);;
        setSidebarIndex(sideIndex);
      }
    
      useEffect(() => {
        fetchNote();
    }, []);
    const fetchNote = () => {
        NoteService
            .getNotes()
            .then((res) => {
                dispatch(setNotes(res.data.filter(item => !item.trash)));
                dispatch(setTrashNotes(res.data.filter(item => item.trash)));
            })
            .catch((err) => {
                console.log(err);
            });
    }
    const handleDrawerOpen = () => {
        setOpen((prevState) => {
            return !prevState;
        });
    };
    const renderOption=()=>{
        switch(sidebarIndex){
            case 0:
                return(
                    <Box component="main" sx={{ flexGrow: 1, p: 3, margin: "5% auto" }}>
                        <CreateNote/>
                        <Note/>
                    </Box>
                );
            case 1:
                return(
                    <Box component="main" sx={{ flexGrow: 1, p: 3, margin: "5% auto" }}>
                        <Trash/>
                    </Box> 
                )
        }
    }
    return (
        <Box sx={{ display: "flex" }}>
            <PrimarySearchAppBar handleDrawerOpen={handleDrawerOpen} title={title} />
            <Sidebar open={open} handleTitle={handleTitle}/>
            {
                renderOption()
            }
        </Box>
    )
};

export default Homepage;