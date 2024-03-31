import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Grid,
  CardHeader,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import Project from "../../../models/Project";
import TicketCreateModalController from "../../../controllers/components/TicketCreateModalController";
import TicketEditModalController from "../../../controllers/components/TicketEditModalController";
import { statusOptions } from "../../../constants/ticketConstants";
import Ticket from "../../../models/Ticket";
import KanbanSelect from "./KanbanSelect";
import UserAddModalController from "../../../controllers/components/UserAddModalController";

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
      <CardHeader
        title={
          <FormControl margin={"normal"} sx={{ minWidth: 200 }}>
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
        }
        action={
          <>
            <UserAddModalController projectId={selectedProject._id} />
            <TicketCreateModalController project={selectedProject} />
          </>
        }
      />
      <Table style={{ tableLayout: "fixed" }}>
        <TableHead>
          <TableRow>
            {statusOptions.map((status) => (
              <TableCell
                key={status}
                style={{
                  border: "1px solid #ccc",
                }}
              >
                {status}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            {Object.keys(ticketsByStatus).length > 0 ? (
              // Check if ticketsByStatus has data before rendering
              statusOptions.map((status: string, columnIndex: number) => (
                <TableCell
                  key={`cell-${status}-${columnIndex}`}
                  style={{
                    border: "1px solid #ccc",
                    verticalAlign: "top",
                  }}
                >
                  {ticketsByStatus[status]?.map((ticket: Ticket) => {
                    return (
                      <TicketEditModalController
                        key={`edit-${ticket._id}`}
                        ticket={ticket}
                        title={ticket.title}
                      />
                    );
                  })}
                </TableCell>
              ))
            ) : (
              <TableCell
                colSpan={statusOptions.length}
                sx={{ textAlign: "center" }}
              >
                No tickets available for the selected project.
              </TableCell>
            )}
          </TableRow>
        </TableBody>
      </Table>
    </Grid>
  );
};
export default KanbanMobileView;
