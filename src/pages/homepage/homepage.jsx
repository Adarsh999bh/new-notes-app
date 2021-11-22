import Sidebar from "../../components/dashboard/SideBar";
import PrimarySearchAppBar from "../../components/dashboard/AppBar";
import Note from "../../components/dashboard/Note";
import NoteService from '../../service/noteService';
import React, { useState, useEffect } from "react";
import { Box } from "@mui/system";
const Homepage = () => {
    const [open, setOpen] = useState(false);
    const [notes, setNote] = useState([]);
    const [title,setTitle] = useState('Fundoo Note');

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
                setNote(res.data);
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
                <Note notes={notes} />
            </Box>
        </Box>
    )
};

export default Homepage;