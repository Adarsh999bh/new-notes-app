import React, { useState } from "react";
import RainbowText from "react-rainbow-text";
import { Link } from "react-router-dom";
import {
  Grid,
  TextField,
  Typography,
  Button,
  Paper,
} from "@mui/material";
import "../../css/extstyle.css"
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const handleSubmit = (e) => {
    let flag=true;
    e.preventDefault();
    setEmailError(false);
    setPasswordError(false);
    if (email === "") {
      setEmailError(true);
      flag=false;
    }
    if (password === "") {
      setPasswordError(true);
      flag=false
    }
    if(flag===true){
      axios.post('http://localhost:4000/user/login',{
        email:email,
        password:password
      }).then(response => {
        alert("logged in.!")
      }).catch(err => {
        alert("some error ocurred in logging in check console");
        console.log(err);
      })
    }
  };

  return (
    <form id="login-form" onSubmit={handleSubmit} autoComplete="off">
      <Paper elevation={5} sx={{ p: 4 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h4">
              <RainbowText lightness={0.5} saturation={1}>
                Fundoo Note
              </RainbowText>
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h5">Sign in</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="p">to continue to Fundoo Notes</Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="email"
              label="Email"
              variant="outlined"
              error={emailError}
              helperText={emailError ? "Email cannot be empty" : ""}
              fullWidth
              onChange={(e) => setEmail(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="password"
              label="password"
              type="password"
              variant="outlined"
              fullWidth
              onChange={(e) => setPassword(e.target.value)}
              error={passwordError}
              helperText={passwordError ? "Password cannot be empty" : ""}
            />
          </Grid>
          <Grid item xs={6} align="left">
            <Button id="link-btn">Forgot password</Button>
          </Grid>
          <Grid item xs={6} align="right">
            <Button variant="contained" type="submit">
              Submit
            </Button>
          </Grid>
          <Grid item xs={6} align="left">
            <Button id="link-btn" component={Link} to="/">
              Create account
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </form>
  );
};

export default Login;