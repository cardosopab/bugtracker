import {
  DASHBOARD_URL,
  KANBAN_URL,
  PROJECTS_URL,
  ROLES_URL,
  TICKETS_URL,
  USERS_URL,
} from "./screensUrls";

const navOptions = [
  { name: "Dashboard", icon: "dashboard", url: DASHBOARD_URL },
  { name: "Kanban Board", icon: "table-chart", url: KANBAN_URL },
  { name: "Projects Overview", icon: "handy-man", url: PROJECTS_URL },
  { name: "Tickets Overview", icon: "list", url: TICKETS_URL },
  { name: "Role Assignment", icon: "group-add", url: ROLES_URL },
  { name: "Personnel Assignment", icon: "group", url: USERS_URL },
];

export { navOptions };
