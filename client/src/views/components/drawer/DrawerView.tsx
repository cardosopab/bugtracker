import { styled } from "@mui/material/styles";
import {
  Box,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import { Logout, Menu } from "@mui/icons-material";
import User from "../../../models/User";
import { Location } from "react-router-dom";
import { adminPages, navOptions } from "../../../constants/drawerConstants";

interface DrawerViewProps {
  currentUser: User;
  open: boolean;
  location: Location<any>;
  handleListItemClick: (
    _event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    url: string
  ) => void;
  handleIconSwitch: (icon: string) => JSX.Element;
  handleDrawerToggle: () => void;
  handleLogout: () => void;
  children: React.ReactNode;
}
interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const DrawerView = ({
  currentUser,
  open,
  location,
  handleListItemClick,
  handleIconSwitch,
  handleDrawerToggle,
  handleLogout,
  children,
}: DrawerViewProps) => {
  const drawerWidth = 240;
  const currentRole = currentUser?.role;

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

  const drawer = (
    <>
      <DrawerHeader>
        <Typography>{currentUser?.name}</Typography>
      </DrawerHeader>
      <Divider />
      <List>
        {navOptions.map(({ name, icon, url }) => {
          const isUserAdmin = currentRole === "Admin" || currentRole === "Demo";
          const isAdminPage = adminPages.includes(url);
          const isNavOptionVisible = isUserAdmin || !isAdminPage;

          if (!isNavOptionVisible) {
            // Hide the navigation option for other roles
            return null;
          }

          return (
            <ListItem key={name} disablePadding>
              <ListItemButton
                selected={location.pathname === url}
                onClick={(event) => handleListItemClick(event, url)}
              >
                <ListItemIcon>{handleIconSwitch(icon)}</ListItemIcon>
                <ListItemText primary={name} />
              </ListItemButton>
            </ListItem>
          );
        })}
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
            {currentUser?.email}
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
            // Better open performance on mobile.
            keepMounted: true,
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

export default DrawerView;
