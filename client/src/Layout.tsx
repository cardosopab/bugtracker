import { Outlet } from "react-router-dom";
import DrawerController from "./controllers/components/DrawerController";
const Layout = () => {
  return (
    <>
      <DrawerController>
        <Outlet />
      </DrawerController>
    </>
  );
};
export default Layout;
