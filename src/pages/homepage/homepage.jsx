import Sidebar from "../../components/SideBar";
import PrimarySearchAppBar from "../../components/AppBar";
import Note from "../../components/Note";
import NoteService from '../../service/noteService';
import React, { useState} from "react";
import { Box } from "@mui/system";
import { useDispatch } from "react-redux";
import { setNotes } from "../../actions/noteActions";
import { useEffect } from "react";
import CreateNote from "../../components/createNote";

const Homepage = () => {
    const [open, setOpen] = useState(false);
    const [title,setTitle] = useState('Fundoo Note');
    const dispatch = useDispatch()


    const handleTitle = (title) => {
        setTitle(title)
      }
    
      useEffect(() => {
        fetchNote();
    }, []);
    const fetchNote = () => {
        NoteService
            .getNotes()
            .then((res) => {
                dispatch(setNotes(res.data.filter(item => !item.trash)));
            })
            .catch((err) => {
                console.log("inside fetch error")
                console.log(err);
            });
    }
    const handleDrawerOpen = () => {
        setOpen((prevState) => {
            return !prevState;
        });
    };
    return (
        <Box sx={{ display: "flex" }}>
            <PrimarySearchAppBar handleDrawerOpen={handleDrawerOpen} title={title} />
            <Sidebar open={open} handleTitle={handleTitle} />
            <Box component="main" sx={{ flexGrow: 1, p: 3, margin: "5% auto" }}>
                <CreateNote/>
                <Note/>
            </Box>
        </Box>
    )
};

export default Homepage;