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
import { Auth } from "firebase/auth";
import User from "../../models/User";

interface DrawerViewProps {
  auth: Auth;
  currentUser: User;
  open: boolean;
  navOptions: {
    name: string;
    icon: string;
    url: string;
  }[];
  roles: string[];
  drawerIndex: number;
  handleListItemClick: (
    _event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number,
    url: string
  ) => void;
  handleIconSwitch: (icon: string) => JSX.Element;
  handleDrawerToggle: () => void;
  handleLogout: () => void;
  children: React.ReactNode;
}

const DrawerView = ({
  auth,
  currentUser,
  open,
  navOptions,
  roles,
  drawerIndex,
  handleListItemClick,
  handleIconSwitch,
  handleDrawerToggle,
  handleLogout,
  children,
}: DrawerViewProps) => {
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

  const drawer = (
    <>
      <DrawerHeader>
        <Typography>{currentUser?.name}</Typography>
      </DrawerHeader>
      <Divider />
      <List>
        {navOptions.map(({ name, icon, url }, i) => {
          const isNavOptionVisible =
            (i !== 4 && i !== 5) || // Display all options except navOptions[4] and navOptions[5]
            currentUser?.role === roles[3] ||
            currentUser?.role === roles[4] ||
            currentUser?.role === "Demo"; // Display navOptions[4] and navOptions[5] for roles[3] and roles[4]

          if (!isNavOptionVisible) {
            return null; // Hide the navigation option for other roles
          }

          return (
            <ListItem key={name} disablePadding>
              <ListItemButton
                selected={drawerIndex === i}
                onClick={(event) => handleListItemClick(event, i, url)}
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

export default DrawerView;
