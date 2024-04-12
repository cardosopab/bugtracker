import {
  Grid,
  SelectChangeEvent,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import Ticket from "../../../models/Ticket";
import Project from "../../../models/Project";
import KanbanMobileView from "./KanbanMobileView";
import KanbanDesktopView from "./KanbanDesktopView";

interface KanbanViewProps {
  projects: Project[];
  selectedProject: Project | undefined;
  handleProjectDropdown: (event: SelectChangeEvent) => void;
  ticketsByStatus: { [status: string]: Ticket[] };
}

const KanbanView = ({
  projects,
  selectedProject,
  handleProjectDropdown,
  ticketsByStatus,
}: KanbanViewProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // Check for sm screen
  return (
    <>
      <Grid container spacing={2} padding={2}>
        {/* Title/Header */}
        <Grid item xs={12}>
          <h1>Kanban Board</h1>
        </Grid>

        {/* Kanban Board */}
        {isMobile ? (
          // Mobile viewport layout
          <KanbanMobileView
            projects={projects}
            selectedProject={selectedProject}
            ticketsByStatus={ticketsByStatus}
            handleProjectDropdown={handleProjectDropdown}
          />
        ) : (
          // Desktop viewport layout
          <KanbanDesktopView
            projects={projects}
            selectedProject={selectedProject}
            ticketsByStatus={ticketsByStatus}
            handleProjectDropdown={handleProjectDropdown}
          />
        )}
      </Grid>
    </>
  );
};

export default KanbanView;
