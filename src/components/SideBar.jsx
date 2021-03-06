import React from "react";
import { styled } from "@mui/material/styles";
import { List, ListItem} from "@mui/material";
import MuiDrawer from "@mui/material/Drawer";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

const drawerWidth = 240;
const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  borderRight: "0px",
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(9)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {

  shouldForwardProp: (prop) => prop !== "open",})(({ theme, open }) => 
  ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const Sidebar = ({ open,handleTitle}) => {

  return (
    <Drawer variant="permanent" open={open}>
      <DrawerHeader />
      <List>

          <ListItem button onClick={() => handleTitle("Fundoo Note",0)}>
            <ListItemIcon>
             <LightbulbOutlinedIcon/>
            </ListItemIcon>
            <ListItemText primary="Notes" />
          </ListItem>

          <ListItem button onClick={() => handleTitle("Reminders",0)}>
            <ListItemIcon>
             <NotificationsNoneOutlinedIcon/>
            </ListItemIcon>
            <ListItemText primary="Reminders" />
          </ListItem>

          <ListItem button onClick={() => handleTitle("Edit labels",0)}>
            <ListItemIcon>
             <EditOutlinedIcon/>
            </ListItemIcon>
            <ListItemText primary="Edit labels" />
          </ListItem>

          <ListItem button onClick={() => handleTitle("Archive",0)}>
            <ListItemIcon>
             <ArchiveOutlinedIcon/>
            </ListItemIcon>
            <ListItemText primary="Archive" />
          </ListItem>

          <ListItem button onClick={() => handleTitle("Trash",1)}>
            <ListItemIcon>
             <DeleteOutlineOutlinedIcon/>
            </ListItemIcon>
            <ListItemText primary="Trash" />
          </ListItem>
          
      </List>
    </Drawer>
  );
};

export default Sidebar;