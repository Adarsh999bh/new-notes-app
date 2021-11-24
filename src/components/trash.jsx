import React from 'react';
import { Box, Grid, Card, CardContent, Typography } from "@mui/material";
import "../css/extstyle.css";
import { useSelector } from "react-redux";
import { useState } from "react";
import { styled } from "@mui/material/styles";
import TrashIcons from './trashIcons';

const Cards = styled(Card)`
  &:hover {
    background: #e6e8e6;
  }
`;

const Trash = () => {

    const trashNotes = useSelector((state) => state.allNotes.trashNotes);
    const [hover, setHover] = useState([trashNotes.map((notes) => false)]);
    return (
        <Box className="main-container">
            <Grid container spacing={4}>
                {trashNotes.map((item, index) => {
                    return (
                        <Grid item xs={12} sm={6} md={4} key={item._id}>
                            <Cards
                                sx={{ width: 250, height: 140 }}
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
                                style={{ borderRadius: "20px" }}
                            >
                                <CardContent>
                                    <Typography variant="h5">{item.title}</Typography>
                                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                        {item.content}
                                    </Typography>
                                </CardContent>
                                {hover[index] ? <TrashIcons id={item._id} title={item.title} content={item.content} /> : null}
                            </Cards>
                        </Grid>
                    );
                })}
            </Grid>
        </Box>
    );
}

export default Trash
