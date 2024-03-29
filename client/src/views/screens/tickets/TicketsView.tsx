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
import Ticket from "../../../models/Ticket";
import User from "../../../models/User";
import Project from "../../../models/Project";
import TicketEditModalController from "../../../controllers/components/TicketEditModalController";
import TicketCreateModalController from "../../../controllers/components/TicketCreateModalController";
import PaginationButtons from "../../components/PaginationButtons";

interface TicketsProps {
  paginatedTickets: Ticket[];
  users: User[];
  projects: Project[];
  page: any;
  totalPages: any;
  handlePageChange: (page: number) => void;
}

const TicketsView = ({
  paginatedTickets,
  users,
  projects,
  page,
  totalPages,
  handlePageChange,
}: TicketsProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // Check for sm screen

  return (
    <>
      {paginatedTickets.length > 0 ? (
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
                action={<TicketCreateModalController />}
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
                  {paginatedTickets.map((ticket) => {
                    const {
                      _id,
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
                      (user) => user._id === submitterId
                    );
                    const personnel = users.find(
                      (user) => user._id === personnelId
                    );
                    const project = projects.find(
                      (project) => project._id === projectId
                    );

                    return (
                      <TableRow key={_id}>
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
                              <TicketEditModalController ticket={ticket} />
                            </TableCell>
                          </>
                        ) : (
                          // Render only for xs screens
                          <>
                            <TableCell>{title}</TableCell>
                            <TableCell>{status}</TableCell>
                            <TableCell>
                              <TicketEditModalController ticket={ticket} />
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
          <CardHeader title="No Tickets have been created yet!" />
        </Card>
      )}
      <Grid item xs={12}>
        <PaginationButtons
          page={page}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </Grid>
    </>
  );
};

export default TicketsView;
