import { Box, Grid, Card, CardContent, Typography, CardMedia} from "@mui/material";
import React from "react";
import "../css/extstyle.css";
import { useSelector } from "react-redux";
import NoteIcons from "./noteIcons";
import { useState } from "react";
import { styled } from "@mui/material/styles";
import Popup from "./popUp";
import { Snackbar } from "@mui/material";

// const Cards = styled(Card)`
//   &:hover {
//     box-shadow: 0 0 11px rgba(33,33,33,.5); 
//   }
// `;



const Note = () => {
  const myNotes = useSelector((state) => state.allNotes.filteredNotes); 
  const [hover, setHover] = useState([myNotes.map((notes)=>false)]);
  const [isOpen, setIsOpen] = useState(false);
  const [updateData, setUpdateData] = useState({});
  const [colorIndexArray,setcolorIndexArray]=useState([myNotes.map(notes=>notes.colorIndex)])

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


  return (
    <Box className="main-container">
      <Grid container spacing={3}>
        {myNotes.map((item,index) => {
          return (
            <Grid item xs={12} sm={6} md={4} key={item._id}>
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
              style={{borderRadius:"20px",background: item.color}}
              >
                <CardContent
                onClick={() => handleUpdate(item, index)}
                >
                  {/* {item.imgFile!==""?<img src={`http://localhost:4000/images/${item.imgFile}`} height="200px" width="250px"/>:null} */}
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
                    }} color="text.secondary">
                    {item.content}
                  </Typography>
                </CardContent>
                {hover[index] ? <NoteIcons id={item._id} title={item.title} content={item.content} colors={item.color}/> :<div style={{ height:"40px" }}></div>}
              </Card>
            </Grid>
          );
        })}
      </Grid>
      {isOpen && <Popup handleClose={handleClose} item={updateData} />}
    </Box>
  );
};

export default Note;