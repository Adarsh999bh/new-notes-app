import Sidebar from "../../components/dashboard/SideBar";
import PrimarySearchAppBar from "../../components/dashboard/AppBar";
import Note from "../../components/dashboard/Note";
import NoteService from '../../service/noteService';
import React, { useState, useEffect} from "react";

let obj = [
    {
        title: "hello",
        content: "world",
    },
    {
        title: "yello",
        content: "world",
    }
]

const Homepage = () => {
    const [note, setNote] = useState([]);
    useEffect(() => {
        fetchNotes();
    }, []);
    const fetchNotes = () => {
        NoteService
            .getNotes()
            .then((res) => {
                setNote(res.data);
                console.log(res.data);
                console.log(res);
            })
            .catch((err) => {
                console.log("inside error futch")
                console.log(err);
            });
    }
    return (
        <div>
            <Sidebar open={false} />
            <PrimarySearchAppBar />
            <Note notes={note} />
        </div>
    )
};

export default Homepage;