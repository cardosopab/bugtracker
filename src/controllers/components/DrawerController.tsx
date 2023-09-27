import * as React from "react";
import { auth } from "../../models/database/firebase-init";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setDrawerIndex } from "../../models/redux/drawerSlice";
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

interface DrawerControllerProps {
  children: React.ReactNode;
}

const DrawerController = ({ children }: DrawerControllerProps) => {
  const navigateTo = useNavigate();
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();
  const currentUser = useSelector((state: RootState) => state.auth.currentUser);
  const drawerIndex = useSelector((state: RootState) => state.drawer.index);

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  const handleLogout = () => {
    dispatch(setDrawerIndex(0));
    auth.signOut().then((response) => {
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
      currentUser={currentUser}
      open={open}
      navOptions={navOptions}
      roles={roles}
      drawerIndex={drawerIndex}
      handleListItemClick={handleListItemClick}
      handleIconSwitch={handleIconSwitch}
      handleDrawerToggle={handleDrawerToggle}
      handleLogout={handleLogout}
      children={children}
    />
  );
};

export default DrawerController;
