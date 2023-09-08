
import { Dashboard, Group, GroupAdd, Handyman, List, Person, TableChart } from "@mui/icons-material";

import { DASHBOARD_URL, KANBAN_URL, PROJECTS_URL, ROLES_URL, TICKETS_URL, USERS_URL } from "../views/viewsUrls";
const handleIconSwitch = (icon: string) => {
    switch (icon) {
        case 'table-chart':
            return <TableChart />
        case 'dashboard':
            return <Dashboard />
        case 'group-add':
            return <GroupAdd />
        case 'group':
            return <Group />
        case 'handy-man':
            return <Handyman />
        case 'list':
            return <List />
        case 'person':
            return <Person />
        default:
            return <Dashboard />
    }
}


const navOptions = [
    { name: "Dashboard Home", icon: 'dashboard', url: DASHBOARD_URL },
    { name: "My Kanban", icon: 'table-chart', url: KANBAN_URL },
    { name: "Manage Role Assignment", icon: 'group-add', url: ROLES_URL },
    { name: "Manage Project Users", icon: 'group', url: USERS_URL },
    { name: "My Projects", icon: 'handy-man', url: PROJECTS_URL },
    { name: "My Tickets", icon: 'list', url: TICKETS_URL },
    // { name: "User Profile", icon: 'person', url: PROFILE_URL },
]

export { handleIconSwitch, navOptions };