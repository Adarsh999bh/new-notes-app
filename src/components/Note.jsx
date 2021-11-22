import { Box, Grid, Card, CardContent, Typography } from "@mui/material";
import React from "react";
import "../css/extstyle.css";
import { useSelector } from "react-redux";
import NoteIcons from "./noteIcons";
import { useState } from "react";
const Note = ({notes}) => {
  const myNotes = useSelector((state) => state.allNotes.filteredNotes); 
  const [hover, setHover] = useState([myNotes.map((notes)=>false)]);
  return (
    <Box className="main-container">
      <Grid container spacing={4}>
        {myNotes.map((item,index) => {
          return (
            <Grid item xs={12} sm={6} md={4} key={item._id}>
              <Card
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
              >
                <CardContent>
                  <Typography variant="h5">{item.title}</Typography>
                  <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    {item.content}
                  </Typography>
                  {hover[index] ? <NoteIcons id={item._id} /> : null}
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default Note;