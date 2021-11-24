import { Box, Grid, Card, CardContent, Typography } from "@mui/material";
import React from "react";
import "../css/extstyle.css";
import { useSelector } from "react-redux";
import NoteIcons from "./noteIcons";
import { useState } from "react";
import { styled } from "@mui/material/styles";
import Popup from "./popUp";
const Cards = styled(Card)`
  &:hover {
    background: #e6e8e6;
  }
`;

const Note = () => {
  const myNotes = useSelector((state) => state.allNotes.filteredNotes); 
  const [hover, setHover] = useState([myNotes.map((notes)=>false)]);
  const [isOpen, setIsOpen] = useState(false);
  const [updateData, setUpdateData] = useState({});

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
      <Grid container spacing={4}>
        {myNotes.map((item,index) => {
          return (
            <Grid item xs={12} sm={6} md={4} key={item._id}>
              <Cards
              sx={{ width: 250, height: 140}}
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
              style={{borderRadius:"20px"}}
              >
                <CardContent
                onClick={() => handleUpdate(item, index)}
                >
                  <Typography variant="h5">{item.title}</Typography>
                  <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    {item.content}
                  </Typography>
                </CardContent>
                {hover[index] ? <NoteIcons id={item._id} title={item.title} content={item.content}/> : null}
              </Cards>
            </Grid>
          );
        })}
      </Grid>
      {isOpen && <Popup handleClose={handleClose} item={updateData} />}
    </Box>
  );
};

export default Note;