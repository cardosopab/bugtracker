import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Grid,
  CardHeader,
  Card,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  Typography,
  ImageList,
  ImageListItem,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { statusOptions } from "../../constants/ticketConstants";
import DrawerController from "../components/DrawerController";
import { useSelector } from "react-redux";
import { RootState } from "../../models/redux/store";
import Ticket from "../../models/Ticket";
import { useEffect, useState } from "react";
import EditTicketController from "../components/EditTicketModalController";
import CreateTicketModalController from "../components/CreateTicketModalController";
import Project from "../../models/Project";

const KanbanController = () => {
  const tickets = useSelector((state: RootState) => state.tickets.value);
  const projects = useSelector((state: RootState) => state.projects.value);
  const [selectedProject, setSelectedProject] = useState<Project | undefined>(
    undefined
  );
  const [ticketsByStatus, setTicketsByStatus] = useState<{
    [status: string]: Ticket[];
  }>({});

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // Check for sm screen

  useEffect(() => {
    if (projects.length > 0) {
      setSelectedProject(projects[0]);
    }
  }, [projects]);

  useEffect(() => {
    if (selectedProject) {
      const updatedTicketsByStatus: { [status: string]: Ticket[] } = {};

      tickets.forEach((ticket: Ticket) => {
        if (ticket.projectId === selectedProject.id) {
          if (!updatedTicketsByStatus[ticket.status]) {
            updatedTicketsByStatus[ticket.status] = [];
          }
          updatedTicketsByStatus[ticket.status].push(ticket);
        }
      });

      setTicketsByStatus(updatedTicketsByStatus);
    }
  }, [selectedProject, tickets]);

  const handleProjectDropdown = (event: SelectChangeEvent) => {
    const selectedProjectName = event.target.value as string;
    const selectedProjectObj = projects.find(
      (project) => project.name === selectedProjectName
    );

    if (selectedProjectObj) {
      setSelectedProject(selectedProjectObj);
    }
  };

  return (
    <DrawerController>
      {projects.length > 0 && selectedProject !== undefined ? (
        <Grid container spacing={2} padding={2}>
          {/* Title/Header */}
          <Grid item xs={12}>
            <h1>Kanban Board</h1>
          </Grid>

          {/* Kanban Board */}
          {isMobile ? ( // Use single-column layout on xs screens
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
                          <MenuItem key={option.id} value={option.name}>
                            {option.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  }
                  subheader={
                    <Grid
                      item
                      xs={12}
                      sx={{ justifyContent: "end", textAlign: "end" }}
                    >
                      <CreateTicketModalController />
                    </Grid>
                  }
                />
                <ImageList cols={1}>
                  {statusOptions.map((status) => (
                    <ImageListItem
                      key={status}
                      style={{ marginBottom: "16px" }}
                    >
                      <Typography variant="h6" sx={{ backgroundColor: "#eee" }}>
                        {status}
                      </Typography>
                      {ticketsByStatus[status]?.map((ticket: Ticket) => {
                        return (
                          <div key={`ticket-${ticket.id}`}>
                            <EditTicketController
                              key={`edit-${ticket.id}`}
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
          ) : (
            <Grid item xs={12}>
              {/* Regular layout for sm screens */}
              <TableContainer component={Paper}>
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
                          <MenuItem key={option.id} value={option.name}>
                            {option.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  }
                  action={<CreateTicketModalController />}
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
                        statusOptions.map(
                          (status: string, columnIndex: number) => (
                            <TableCell
                              key={`cell-${status}-${columnIndex}`}
                              style={{
                                border: "1px solid #ccc",
                                verticalAlign: "top",
                              }}
                            >
                              {ticketsByStatus[status]?.map(
                                (ticket: Ticket) => {
                                  return (
                                    <EditTicketController
                                      key={`edit-${ticket.id}`}
                                      ticket={ticket}
                                      title={ticket.title}
                                    />
                                  );
                                }
                              )}
                            </TableCell>
                          )
                        )
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
              </TableContainer>
            </Grid>
          )}
        </Grid>
      ) : (
        <Card className="center">
          <CardHeader title="No Projects have been created yet!" />
        </Card>
      )}
    </DrawerController>
  );
};

export default KanbanController;
