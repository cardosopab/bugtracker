import {
  DASHBOARD_URL,
  KANBAN_URL,
  PROJECT_ASSIGNMENT_URL,
  USERS_URL,
} from "./viewEndpoints";

const navOptions = [
  { name: "Dashboard", icon: "dashboard", url: DASHBOARD_URL },
  { name: "Kanban Board", icon: "table-chart", url: KANBAN_URL },
];

const adminPages = [PROJECT_ASSIGNMENT_URL, USERS_URL];

export { navOptions, adminPages };
