import {
  CardHeader,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Grid,
  Card,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import DrawerController from "../../../controllers/components/DrawerController";
import Ticket from "../../../models/Ticket";
import User from "../../../models/User";
import Project from "../../../models/Project";
import EditTicketController from "../../../controllers/components/EditTicketModalController";
import CreateTicketModalController from "../../../controllers/components/CreateTicketModalController";

interface TicketsProps {
  tickets: Ticket[];
  users: User[];
  projects: Project[];
  handleModal: any;
  openTickets: { [id: string]: boolean };
}

function TicketsView({ tickets, users, projects }: TicketsProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // Check for sm screen

  return (
    <DrawerController>
      {projects.length > 0 ? (
        <Grid container spacing={2} padding={2}>
          {/* Title/Header */}
          <Grid item xs={12}>
            <h1>Tickets Overview</h1>
          </Grid>

          {/* Table */}
          <Grid item xs={12}>
            <TableContainer component={Paper}>
              <CardHeader
                title="Tickets"
                subheader="You are a part of:"
                action={<CreateTicketModalController />}
              />
              <Table style={{ tableLayout: "fixed" }}>
                <TableHead>
                  <TableRow>
                    {!isMobile ? ( // Render all columns except for xs screens
                      <>
                        <TableCell>Title</TableCell>
                        <TableCell>Project Name</TableCell>
                        <TableCell>Submitter</TableCell>
                        <TableCell>Developer</TableCell>
                        <TableCell>Priority</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Type</TableCell>
                        <TableCell>Created</TableCell>
                        <TableCell>Actions</TableCell>
                      </>
                    ) : (
                      // Render only for xs screens
                      <>
                        <TableCell>Title</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Actions</TableCell>
                      </>
                    )}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {tickets.map((ticket) => {
                    const {
                      id,
                      title,
                      projectId,
                      submitterId,
                      personnelId,
                      priority,
                      status,
                      type,
                      createdAt,
                    } = ticket;
                    const submitter = users.find(
                      (user) => user.id === submitterId
                    );
                    const personnel = users.find(
                      (user) => user.id === personnelId
                    );
                    const project = projects.find(
                      (project) => project.id === projectId
                    );

                    return (
                      <TableRow key={id}>
                        {!isMobile ? ( // Render all columns except for xs screens
                          <>
                            <TableCell>{title}</TableCell>
                            <TableCell>{project?.name}</TableCell>
                            <TableCell>{submitter?.name}</TableCell>
                            <TableCell>{personnel?.name}</TableCell>
                            <TableCell>{priority}</TableCell>
                            <TableCell>{status}</TableCell>
                            <TableCell>{type}</TableCell>
                            <TableCell>
                              {new Date(createdAt).toLocaleString(undefined, {
                                month: "2-digit",
                                day: "2-digit",
                                year: "2-digit",
                                hour: "numeric",
                                minute: "numeric",
                                hour12: true,
                              })}
                            </TableCell>
                            <TableCell>
                              <EditTicketController ticket={ticket} />
                            </TableCell>
                          </>
                        ) : (
                          // Render only for xs screens
                          <>
                            <TableCell>{title}</TableCell>
                            <TableCell>{status}</TableCell>
                            <TableCell>
                              <EditTicketController ticket={ticket} />
                            </TableCell>
                          </>
                        )}
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      ) : (
        <Card className="center">
          <CardHeader title="No Projects have been created yet!" />
        </Card>
      )}
    </DrawerController>
  );
}

export default TicketsView;
