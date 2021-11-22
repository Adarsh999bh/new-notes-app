import Sidebar from "../../components/dashboard/SideBar";
import PrimarySearchAppBar from "../../components/dashboard/AppBar";
import Note from "../../components/dashboard/Note";
import NoteService from '../../service/noteService';
import React, { useState} from "react";
import { Box } from "@mui/system";
import { useDispatch } from "react-redux";
import { setNotes } from "../../actions/noteActions";
import { useEffect } from "react";

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
                dispatch(setNotes(res.data));
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
                <Note/>
            </Box>
        </Box>
    )
};

export default Homepage;