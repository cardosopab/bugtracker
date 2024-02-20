import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoutes from "./controllers/ProtectedRoutes";
import {
  DASHBOARD_URL,
  PROJECT_DETAILS_URL,
  PROJECTS_URL,
  ROLES_URL,
  TICKETS_URL,
  USERS_URL,
  KANBAN_URL,
  PROJECT_ASSIGNMENT_URL,
} from "./constants/screensUrls";
import TicketsController from "./controllers/screens/TicketsController";
import ProjectsController from "./controllers/screens/ProjectsController";
import AuthController from "./controllers/screens/AuthController";
import RolesController from "./controllers/screens/RolesController";
import UsersController from "./controllers/screens/UsersController";
import ProjectDetailsController from "./controllers/screens/ProjectDetailsController";
import KanbanController from "./controllers/screens/KanbanController";
import DashboardController from "./controllers/screens/DashboardController";
import { useTicketActions } from "./models/database/hooks/useTicketActions";
import { useProjectActions } from "./models/database/hooks/useProjectActions";
import { useUserActions } from "./models/database/hooks/useUserActions";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./models/redux/store";
import { setAuthStatus, setCurrentUser } from "./models/redux/authSlice";
import axios from "axios";
import { AuthEndpoints } from "./constants/endpoints";
import ProjectAssigmentController from "./controllers/screens/ProjectAssignmentController";

function App() {
  const dispatch = useDispatch();
  const authStatus = useSelector((state: RootState) => state.auth.authStatus);
  const users = useSelector((state: RootState) => state.users.value);
  const projects = useSelector((state: RootState) => state.projects.value);
  const tickets = useSelector((state: RootState) => state.tickets.value);
  const { readUsers } = useUserActions();
  const { readProjects } = useProjectActions();
  const { readTickets } = useTicketActions();
  const [loginInitiated, setLoginInitiated] = useState(false);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        await axios.get(AuthEndpoints.STATUS, {
          withCredentials: true,
        });
      } catch (error: any) {
        if (error.response && error.response.status === 401) {
          // User is not authenticated, perform logout
          dispatch(setAuthStatus(false));
          dispatch(setCurrentUser(null));
          window.location.replace("/");
        }
        console.error("Error checking auth status:", error);
      }
    };

    if (authStatus) {
      // Check auth status when the component mounts
      checkAuthStatus();
    }
    if (authStatus && !loginInitiated) {
      // Fetch data if user is authenticated
      readTickets();
      readProjects();
      readUsers();
      setLoginInitiated(true);
    }
  }, [
    authStatus,
    dispatch,
    readTickets,
    readProjects,
    readUsers,
    tickets,
    projects,
    users,
  ]);

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<ProtectedRoutes />}>
          <Route path="/" element={<AuthController />} />
          <Route path={DASHBOARD_URL} element={<DashboardController />} />
          <Route path={KANBAN_URL} element={<KanbanController />} />
          <Route path={PROJECTS_URL} element={<ProjectsController />} />
          <Route path={TICKETS_URL} element={<TicketsController />} />
          <Route path={ROLES_URL} element={<RolesController />} />
          <Route
            path={PROJECT_ASSIGNMENT_URL}
            element={<ProjectAssigmentController />}
          />
          <Route path={USERS_URL} element={<UsersController />} />
          <Route
            path={PROJECT_DETAILS_URL}
            element={<ProjectDetailsController />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
