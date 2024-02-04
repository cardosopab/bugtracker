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
} from "./constants/screensUrls";
import TicketsController from "./controllers/screens/TicketsController";
import ProjectsController from "./controllers/screens/ProjectsController";
import AuthController from "./controllers/screens/AuthController";
import RolesController from "./controllers/screens/RolesController";
import UsersController from "./controllers/screens/UsersController";
import ProjectDetailsController from "./controllers/screens/ProjectDetailsController";
import KanbanController from "./controllers/screens/KanbanController";
import DashboardController from "./controllers/screens/DashboardController";

function App() {
  // const [authInitialized, setAuthInitialized] = useState(false);
  // const authStatus = useSelector((state: RootState) => state.auth.authStatus);
  // const currentUser = useSelector((state: RootState) => state.auth.currentUser);
  // const dispatch = useDispatch();

  // if (!authInitialized) {
  //   return (
  //     <Grid>
  //       <Grid>
  //         <CircularProgress />
  //       </Grid>
  //     </Grid>
  //   );
  // }

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<ProtectedRoutes />}>
          <Route path="/" element={<AuthController />} />
          <Route path={DASHBOARD_URL} element={<DashboardController />} />
          <Route path={KANBAN_URL} element={<KanbanController />} />
          <Route path={ROLES_URL} element={<RolesController />} />
          <Route path={USERS_URL} element={<UsersController />} />
          <Route path={PROJECTS_URL} element={<ProjectsController />} />
          <Route path={TICKETS_URL} element={<TicketsController />} />
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
