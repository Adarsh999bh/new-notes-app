import React from "react";
import { styled } from "@mui/material/styles";
import keepImage from "../assets/keep_2020q4_48dp.png";
import {
  Toolbar,
  Typography,
  IconButton,
  TextField,
  InputAdornment,
  Tooltip,
  Button,
  Popover,
  Avatar,
} from "@mui/material";
import MuiAppBar from "@mui/material/AppBar";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import RefreshOutlinedIcon from "@mui/icons-material/RefreshOutlined";
import SplitscreenOutlinedIcon from "@mui/icons-material/SplitscreenOutlined";
import "../css/extstyle.css";
import { useState,useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setFilteredNotes,listView } from "../actions/noteActions";
import { Redirect } from "react-router";
import GridViewIcon from "@mui/icons-material/GridView";

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  spacing: 2,
  backgroundColor: "white",
}));



const Appbar = ({ handleDrawerOpen,title}) => {
  const [search, setSearch] = useState("");
  const myNotes = useSelector((state) => state.allNotes.notes);
  const list = useSelector((state) => state.allNotes.listView);
  const [logout, setLogout] = useState(false);
  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = useState(null);
  const handlePopClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handlePopClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const handleLogout = () => {
    localStorage.removeItem("token");
    setLogout(true);
  };
  const handleView = () => {
    dispatch(listView());
  };

  const handleSearch = (searchValue) => {
    setSearch(searchValue);
  };

  useEffect(() => {
    dispatch(
      setFilteredNotes(
        myNotes.filter((item) => {
          return item.title.toLowerCase().includes(search.toLowerCase());
        })
      )
    );
  }, [search, myNotes]);

  const account = localStorage.getItem("Account");

  return (
    <AppBar position="fixed">
      <Toolbar style={{ color: "rgba(0, 0, 0, 0.54)" }}>
        <IconButton
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          sx={{
            marginRight: "30px",
          }}
        >
          <MenuIcon />
        </IconButton>
        <img src={keepImage} alt="" style={{ width: "2em", height: "2.5em" }} />
        <Typography
          variant="h6"
          noWrap
          style={{ fontWeight: "bold", marginLeft: "10px" }}
          component="div"
        >
          {title}
        </Typography>
        <TextField
          placeholder="Search…"
          style={{ width: "50%", margin: "auto" }}
          variant="outlined"
          size="small"
          onChange={e => handleSearch(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
            style: { height: "44px" },
          }}
        />
        <RefreshOutlinedIcon fontSize="medium" style={{ marginLeft: "15px" }} />
        {!list ? (
          <Tooltip title="List View">
            <SplitscreenOutlinedIcon
              fontSize="medium"
              onClick={handleView}
              style={{ marginLeft: "15px" }}
            />
          </Tooltip>
        ) : (
          <Tooltip title="Grid View">
            <GridViewIcon
              fontSize="medium"
              onClick={handleView}
              style={{ marginLeft: "15px" }}
            />
          </Tooltip>
        )}
        <SettingsOutlinedIcon
          fontSize="medium"
          style={{ marginLeft: "15px" }}
        />
         <div className="appbar-div">
          <Tooltip
            title={
              <span>
                <b>Fundoo Account</b>
                <p>{account}</p>
              </span>
            }
          >
            <IconButton onClick={handlePopClick}>
              <Avatar>{account[0].toLocaleUpperCase()}</Avatar>
            </IconButton>
          </Tooltip>
          <Popover
            open={open}
            anchorEl={anchorEl}
            onClose={handlePopClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
          >
            <Button
              onClick={handleLogout}
              style={{
                color: "black",
                textTransform: "none",
                fontWeight: "bold",
              }}
            >
              Logout
            </Button>
          </Popover>
        </div>
      </Toolbar>
      {logout ? <Redirect to="/login" /> : null}
    </AppBar>
  );
};

export default Appbar;