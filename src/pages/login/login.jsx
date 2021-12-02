import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from 'react-router-dom'
import {
  Grid,
  TextField,
  Typography,
  Button,
  Paper,
} from "@mui/material";
import "../../css/extstyle.css"
import userService from "../../service/userService";

const Login = () => {
  let histroy=useHistory();
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
        userService.login({
            email:email,
            password:password
        }).then(response => {
            console.log(response);
            localStorage.setItem('token',response.data.token)
            localStorage.setItem("Account",email)
            histroy.push('/home');
        }).catch(err => {
            console.log(err);
        });
    }
    // document.getElementById("login-form").reset();
  };

  return (
    <form id="login-form" onSubmit={handleSubmit} autoComplete="off">
      <Paper elevation={5} sx={{ p: 4 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h4">
              {/* <RainbowText lightness={0.5} saturation={1}>
                Fundoo Note
              </RainbowText> */}
              Fundoo Note
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
            <Button id="link-btn"component={Link} to="/forgotpass">Forgot password</Button>
          </Grid>
          <Grid item xs={6} align="right">
            <Button variant="contained" type="submit" id="submit">
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