import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { Logout, Menu } from "@mui/icons-material";
import { auth } from "../models/database/firebase-init";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setDrawerIndex } from "../models/redux/drawerSlice";
import { RootState } from "../models/redux/store";
import { handleIconSwitch, navOptions } from "../constants/drawerConstants";
import { roles } from "../constants/userConstants";

const drawerWidth = 240;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

interface DrawerControllerProps {
  children: React.ReactNode;
}
const DrawerController = ({ children }: DrawerControllerProps) => {
  const navigateTo = useNavigate();
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();
  const drawerIndex = useSelector((state: RootState) => state.drawer.index);
  const currentUserId = useSelector(
    (state: RootState) => state.auth.currentUserId
  );
  const users = useSelector((state: RootState) => state.users.value);
  const currentUser = users.find((user) => currentUserId === user.id);

  const handleDrawerToggle = () => {
    setOpen(!open);
  };
  const handleLogout = () => {
    dispatch(setDrawerIndex(0));
    auth.signOut().then((response) => {
      console.log("response", response);
      navigateTo("/");
    });
  };

  const handleListItemClick = (
    _event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number,
    url: string
  ) => {
    dispatch(setDrawerIndex(index));
    navigateTo(url);
  };

  const drawer = (
    <>
      <DrawerHeader>
        <Typography>{currentUser?.name}</Typography>
      </DrawerHeader>
      <Divider />
      <List>
        {/* Display Navigation list based on Role */}
        {navOptions.map(({ name, icon, url }, i) =>
          (navOptions[4].name == name && currentUser?.role != roles[4]) ||
          (navOptions[5].name == name &&
            currentUser?.role != roles[4]) ? null : (
            <ListItem key={name} disablePadding>
              <ListItemButton
                selected={drawerIndex === i}
                onClick={(event) => handleListItemClick(event, i, url)}
              >
                <ListItemIcon>{handleIconSwitch(icon)}</ListItemIcon>
                <ListItemText primary={name} />
              </ListItemButton>
            </ListItem>
          )
        )}
      </List>
      <Divider />
    </>
  );
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { lg: `calc(100% - ${drawerWidth}px)` },
          ml: { lg: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { lg: "none" } }}
          >
            <Menu />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            {auth.currentUser?.email}
          </Typography>
          <IconButton color="inherit" onClick={handleLogout} edge="end">
            <Logout />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { lg: drawerWidth }, flexShrink: { lg: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          variant="temporary"
          open={open}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", lg: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", lg: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: { lg: `calc(100% - ${drawerWidth}px)` },
          marginTop: "64px",
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default DrawerController;
