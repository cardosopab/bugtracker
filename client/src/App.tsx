import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoutes from "./controllers/ProtectedRoutes";
import {
  DASHBOARD_URL,
  PROJECT_DETAILS_URL,
  PROJECTS_URL,
  TICKETS_URL,
  USERS_URL,
  KANBAN_URL,
  PROJECT_ASSIGNMENT_URL,
} from "./constants/viewEndpoints";
import TicketsController from "./controllers/screens/TicketsController";
import ProjectsController from "./controllers/screens/ProjectsController";
import AuthController from "./controllers/screens/AuthController";
import UsersController from "./controllers/screens/UsersController";
import ProjectDetailsController from "./controllers/screens/ProjectDetailsController";
import KanbanController from "./controllers/screens/KanbanController";
import DashboardController from "./controllers/screens/DashboardController";
import ProjectAssigmentController from "./controllers/screens/ProjectAssignmentController";
import Layout from "./Layout";
import useAuthStatusCheck from "./utils/useAuthStatusCheck";

function App() {
  useAuthStatusCheck();

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<ProtectedRoutes />}>
          <Route path="/" element={<AuthController />} />
          <Route path="" element={<Layout />}>
            <Route path={DASHBOARD_URL} element={<DashboardController />} />
            <Route path={KANBAN_URL} element={<KanbanController />} />
            <Route path={PROJECTS_URL} element={<ProjectsController />} />
            <Route path={TICKETS_URL} element={<TicketsController />} />
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
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
