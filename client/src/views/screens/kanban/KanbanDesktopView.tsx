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
        action={<TicketCreateModalController />}
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
