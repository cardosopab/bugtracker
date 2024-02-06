import {
  Grid,
  CardHeader,
  Card,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
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

interface KanbanMobileViewProps {
  projects: Project[];
  selectedProject: Project;
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
              <Select
                labelId="project-dropdown-label"
                value={selectedProject.name}
                name={selectedProject.name}
                label="Select a Project"
                onChange={handleProjectDropdown}
                sx={{
                  color: "white",
                  ".MuiOutlinedInput-notchedOutline": {
                    borderColor: "rgba(228, 219, 233, 0.25)",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "rgba(228, 219, 233, 0.25)",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "rgba(228, 219, 233, 0.25)",
                  },
                  ".MuiSvgIcon-root ": {
                    fill: "white !important",
                  },
                }}
              >
                {projects.map((option) => (
                  <MenuItem key={option._id} value={option.name}>
                    {option.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          }
          subheader={
            <Grid item xs={12} sx={{ justifyContent: "end", textAlign: "end" }}>
              <TicketCreateModalController />
            </Grid>
          }
        />
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
      </Card>
    </Grid>
  );
};
export default KanbanMobileView;
