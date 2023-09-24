import {
  Dashboard,
  Group,
  GroupAdd,
  Handyman,
  List,
  Person,
  TableChart,
} from "@mui/icons-material";

import {
  DASHBOARD_URL,
  KANBAN_URL,
  PROJECTS_URL,
  ROLES_URL,
  TICKETS_URL,
  USERS_URL,
} from "./viewsUrls";

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
    case "person":
      return <Person />;
    default:
      return <Dashboard />;
  }
};

const navOptions = [
  { name: "Dashboard", icon: "dashboard", url: DASHBOARD_URL },
  { name: "Kanban Board", icon: "table-chart", url: KANBAN_URL },
  { name: "Projects Overview", icon: "handy-man", url: PROJECTS_URL },
  { name: "Tickets Overview", icon: "list", url: TICKETS_URL },
  { name: "Role Assignment", icon: "group-add", url: ROLES_URL },
  { name: "Personnel Assignment", icon: "group", url: USERS_URL },
  // { name: "User Profile", icon: 'person', url: PROFILE_URL },
];

export { handleIconSwitch, navOptions };
