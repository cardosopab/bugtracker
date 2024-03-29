import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoutes from "./controllers/ProtectedRoutes";
import { DASHBOARD_URL, KANBAN_URL } from "./constants/viewEndpoints";
import AuthController from "./controllers/screens/AuthController";
import KanbanController from "./controllers/screens/KanbanController";
import DashboardController from "./controllers/screens/DashboardController";
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
            {/* Wildcard route to navigate to root path */}
            <Route path="*" element={<Navigate to="/" />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
