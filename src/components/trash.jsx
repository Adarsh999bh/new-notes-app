import React from 'react';
import { Box, Grid, Card, CardContent, Typography, CardMedia } from "@mui/material";
import "../css/extstyle.css";
import { useSelector } from "react-redux";
import { useState } from "react";
import TrashIcons from './trashIcons';

// const Cards = styled(Card)`
//   &:hover {
//     box-shadow: 0 0 11px rgba(33,33,33,0.5); 
//   }
// `;

const Trash = () => {

    const trashNotes = useSelector((state) => state.allNotes.trashNotes);
    const [hover, setHover] = useState([trashNotes.map((notes) => false)]);
    return (
        <Box className="main-container">
            <p>your trash will get deleted after 7 days</p>
            <Grid container spacing={4}>
                {trashNotes.map((item, index) => {
                    return (
                        <Grid item xs={12} sm={6} md={4} key={item._id}>
                            <Card
                                onMouseOver={() => {
                                    let x = [...hover];
                                    x[index] = true
                                    setHover(x);
                                }}
                                onMouseLeave={() => {
                                    let x = [...hover]
                                    x[index] = false
                                    setHover(x);
                                }}
                                style={{ borderRadius: "20px", background: item.color }}
                            >
                                <CardContent>
                                    {item.imgFile !== "" ? <CardMedia
                                        component="img"
                                        image={`http://localhost:4000/images/${item.imgFile}`}
                                        alt="dish"
                                    /> : null}
                                    <Typography variant="h5">{item.title}</Typography>
                                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                        {item.content}
                                    </Typography>
                                </CardContent>
                                {hover[index] ? (<TrashIcons id={item._id} title={item.title} content={item.content} colors={item.color} />) : (
                                    <div style={{ height: "40px" }}></div>
                                )}
                            </Card>
                        </Grid>
                    );
                })}
            </Grid>
        </Box>
    );
}

export default Trash
