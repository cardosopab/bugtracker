import { Grid, CardHeader, Card, SelectChangeEvent } from "@mui/material";
import Ticket from "../../../models/Ticket";
import Project from "../../../models/Project";
import KanbanMobileView from "./KanbanMobileView";
import KanbanDesktopView from "./KanbanDesktopView";

interface KanbanViewProps {
  projects: Project[];
  selectedProject: Project | undefined;
  isMobile: boolean;
  handleProjectDropdown: (event: SelectChangeEvent) => void;
  ticketsByStatus: { [status: string]: Ticket[] };
}

const KanbanView = ({
  projects,
  selectedProject,
  isMobile,
  handleProjectDropdown,
  ticketsByStatus,
}: KanbanViewProps) => {
  return (
    <>
      {projects.length > 0 && selectedProject !== undefined ? (
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
      ) : (
        <Card className="center">
          <CardHeader title="No Projects have been created yet!" />
        </Card>
      )}
    </>
  );
};

export default KanbanView;
