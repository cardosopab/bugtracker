import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
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
import ListIcon from "@mui/icons-material/List";
import { Dashboard, Group, GroupAdd, Handyman, Logout, Person, Menu, ChevronLeft, ChevronRight } from "@mui/icons-material";
import { auth } from "../models/database/firebase-config";
import { useNavigate } from "react-router-dom";
import { DASHBOARD, PROFILE, PROJECTS, ROLES, TICKETS, USERS } from "./viewsUrls";
import { useDispatch, useSelector } from "react-redux";
import { setDrawerIndex } from '../models/redux/drawerSlice'
import { RootState } from '../models/redux/store'

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
    open?: boolean;
}>(({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
        transition: theme.transitions.create("margin", {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    }),
}));

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

export default function DrawerComponent() {
    const navigateTo = useNavigate();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const dispatch = useDispatch();
    const drawerIndex = useSelector((state: RootState) => state.drawer.index);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };
    const handleLogout = () => {
        dispatch(setDrawerIndex(0));
        auth.signOut().then((response) => {
            console.log("response", response);
            navigateTo("/");
        });
    };

    const handleIconSwitch = (icon: string) => {
        switch (icon) {
            case 'dashboard':
                return <Dashboard />
            case 'group-add':
                return <GroupAdd />
            case 'group':
                return <Group />
            case 'handy-man':
                return <Handyman />
            case 'list':
                return <ListIcon />
            case 'person':
                return <Person />
            default:
                return <Dashboard />
        }
    }
    const handleListItemClick = (
        _event: React.MouseEvent<HTMLDivElement, MouseEvent>,
        index: number,
        url: string,
    ) => {
        dispatch(setDrawerIndex(index));
        navigateTo(url);
    };
    return (
        <Box sx={{ display: "flex" }}>
            <CssBaseline />
            <AppBar position="fixed" open={open} >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{ mr: 2, ...(open && { display: "none" }) }}
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
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    "& .MuiDrawer-paper": {
                        width: drawerWidth,
                        boxSizing: "border-box",
                    },
                }}
                variant="persistent"
                anchor="left"
                open={open}
            >
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === "ltr" ? (
                            <ChevronLeft />
                        ) : (
                            <ChevronRight />
                        )}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <List>
                    {[
                        { name: "Dashboard Home", icon: 'dashboard', url: DASHBOARD },
                        { name: "Manage Role Assignment", icon: 'group-add', url: ROLES },
                        { name: "Manage Project Users", icon: 'group', url: USERS },
                        { name: "My Projects", icon: 'handy-man', url: PROJECTS },
                        { name: "My Tickets", icon: 'list', url: TICKETS },
                        { name: "User Profile", icon: 'person', url: PROFILE },
                    ].map(({ name, icon, url }, i) => (
                        <ListItem key={name} disablePadding >
                            <ListItemButton
                                selected={drawerIndex === i} onClick={(event) => handleListItemClick(event, i, url)}>
                                <ListItemIcon>
                                    {handleIconSwitch(icon)}
                                </ListItemIcon>
                                <ListItemText primary={name} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
                <Divider />
            </Drawer>
            <Main open={open}>
                <DrawerHeader />
            </Main>
        </Box>
    );
}
