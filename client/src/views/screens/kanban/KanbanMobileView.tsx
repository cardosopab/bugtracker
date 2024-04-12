import {
  Grid,
  CardHeader,
  Card,
  FormControl,
  InputLabel,
  Typography,
  ImageList,
  ImageListItem,
  SelectChangeEvent,
} from "@mui/material";
import Project from "../../../models/Project";
import TicketCreateModalController from "../../../controllers/components/TicketCreateModalController";
import TicketEditModalController from "../../../controllers/components/TicketEditModalController";
import { statusOptions } from "../../../constants/ticketConstants";
import Ticket from "../../../models/Ticket";
import KanbanSelect from "./KanbanSelect";
import UserAddModalController from "../../../controllers/components/UserAddModalController";
import ProjectCreateModalController from "../../../controllers/components/ProjectCreateModalController";

interface KanbanMobileViewProps {
  projects: Project[];
  selectedProject: Project | undefined;
  ticketsByStatus: { [status: string]: Ticket[] };
  handleProjectDropdown: (event: SelectChangeEvent) => void;
}
const KanbanMobileView = ({
  projects,
  selectedProject,
  ticketsByStatus,
  handleProjectDropdown,
}: KanbanMobileViewProps) => {
  return (
    <Grid item xs={12}>
      <Card style={{ background: "white" }}>
        <CardHeader
          title={
            selectedProject != undefined ? (
              <FormControl margin={"normal"} fullWidth>
                <InputLabel
                  id="project-dropdown-label"
                  sx={{
                    color: "white",
                    "&.Mui-focused": {
                      color: "white",
                    },
                  }}
                >
                  Select a Project
                </InputLabel>
                <KanbanSelect
                  selectedProject={selectedProject}
                  projects={projects}
                  handleProjectDropdown={handleProjectDropdown}
                />
              </FormControl>
            ) : (
              "Create a Project"
            )
          }
          subheader={
            selectedProject && (
              <Grid
                item
                xs={12}
                sx={{ justifyContent: "end", textAlign: "end" }}
              >
                <>
                  {selectedProject && (
                    <>
                      <TicketCreateModalController project={selectedProject} />
                      <UserAddModalController projectId={selectedProject._id} />
                    </>
                  )}
                  <ProjectCreateModalController isPrimary={true} />
                </>
              </Grid>
            )
          }
        />
        {projects.length > 0 && selectedProject !== undefined ? (
          <ImageList cols={1}>
            {statusOptions.map((status) => (
              <ImageListItem key={status} style={{ marginBottom: "16px" }}>
                <Typography variant="h6" sx={{ backgroundColor: "#eee" }}>
                  {status}
                </Typography>
                {ticketsByStatus[status]?.map((ticket: Ticket) => {
                  return (
                    <div key={`ticket-${ticket._id}`}>
                      <TicketEditModalController
                        key={`edit-${ticket._id}`}
                        ticket={ticket}
                        title={ticket.title}
                      />
                    </div>
                  );
                })}
              </ImageListItem>
            ))}
          </ImageList>
        ) : (
          <Card className="center">
            <CardHeader title="No Projects have been created yet!" />
          </Card>
        )}
      </Card>
    </Grid>
  );
};
export default KanbanMobileView;
