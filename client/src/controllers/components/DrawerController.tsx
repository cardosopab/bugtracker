import * as React from "react";
import { auth } from "../../models/database/firebase-init";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../models/redux/store";
import { navOptions } from "../../constants/drawerConstants";
import { roles } from "../../constants/userConstants";
import {
  Dashboard,
  Group,
  GroupAdd,
  Handyman,
  List,
  TableChart,
} from "@mui/icons-material";
import DrawerView from "../../views/components/drawer/DrawerView";
import { setAuthStatus, setCurrentUser } from "../../models/redux/authSlice";
import axios from "axios";
import { AuthEndpoints } from "../../constants/endpoints";

interface DrawerControllerProps {
  children: React.ReactNode;
}

const DrawerController = ({ children }: DrawerControllerProps) => {
  const location = useLocation();
  const navigateTo = useNavigate();
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();
  const currentUser = useSelector((state: RootState) => state.auth.currentUser);

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  const handleLogout = () => {
    axios
      .post(AuthEndpoints.LOGOUT, {}, { withCredentials: true }) // Add withCredentials
      .then((res) => {
        const isLogout = res.status === 200;
        console.log(`isLogout: ${isLogout}`);
        dispatch(setAuthStatus(isLogout));
        navigateTo("/");
        dispatch(setAuthStatus(false));
        dispatch(setCurrentUser(null));
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          // User is not authenticated, perform logout
          dispatch(setAuthStatus(false));
          dispatch(setCurrentUser(null));
          window.location.replace("/");
        }
        console.log(error.response?.data?.message || "An error occurred");
      });
  };

  const handleListItemClick = (
    _event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    url: string
  ) => {
    navigateTo(url);
  };

  const handleIconSwitch = (icon: string) => {
    switch (icon) {
      case "table-chart":
        return <TableChart />;
      case "dashboard":
        return <Dashboard />;
      case "group-add":
        return <GroupAdd />;
      case "group":
        return <Group />;
      case "handy-man":
        return <Handyman />;
      case "list":
        return <List />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <DrawerView
      auth={auth}
      currentUser={currentUser!}
      open={open}
      navOptions={navOptions}
      roles={roles}
      location={location}
      handleListItemClick={handleListItemClick}
      handleIconSwitch={handleIconSwitch}
      handleDrawerToggle={handleDrawerToggle}
      handleLogout={handleLogout}
      children={children}
    />
  );
};

export default DrawerController;
