import {
  DASHBOARD_URL,
  KANBAN_URL,
  PROJECTS_URL,
  TICKETS_URL,
  ROLES_URL,
  PROJECT_ASSIGNMENT_URL,
  USERS_URL,
} from "./screensUrls";

const navOptions = [
  { name: "Dashboard", icon: "dashboard", url: DASHBOARD_URL },
  { name: "Kanban Board", icon: "table-chart", url: KANBAN_URL },
  { name: "Projects Overview", icon: "handy-man", url: PROJECTS_URL },
  { name: "Tickets Overview", icon: "list", url: TICKETS_URL },
  { name: "Role Assignment", icon: "group-add", url: ROLES_URL },
  { name: "Project Assignment", icon: "group", url: PROJECT_ASSIGNMENT_URL },
  { name: "User Management", icon: "user", url: USERS_URL },
];

const adminPages = [ROLES_URL, PROJECT_ASSIGNMENT_URL, USERS_URL];

export { navOptions, adminPages };
