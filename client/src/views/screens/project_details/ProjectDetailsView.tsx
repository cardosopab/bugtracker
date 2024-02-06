import {
  Box,
  Card,
  CardHeader,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Grid,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import Project from "../../../models/Project";
import Ticket from "../../../models/Ticket";
import User from "../../../models/User";
import TicketCreateModalController from "../../../controllers/components/TicketCreateModalController";
import TicketEditModalController from "../../../controllers/components/TicketEditModalController";
import ProjectDeleteModalController from "../../../controllers/components/ProjectDeleteModalController";

interface DetailsProps {
  project: Project;
  users: User[];
  tickets: Ticket[];
}

const ProjectDetailsView = ({ project, users, tickets }: DetailsProps) => {
  const name = project.name;
  const personnel = project.personnel;

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // Check for sm screen

  return (
    <Grid container spacing={2} padding={2}>
      <Grid item xs={12}>
        {/* Top Row */}
        <Card>
          <CardHeader
            title={`Details for ${name}`}
            action={
              <ProjectDeleteModalController
                project={project}
                isPrimary={true}
              />
            }
          />
          <Box p={2}>
            <div>
              <h2>{project.description}</h2>
            </div>
          </Box>
        </Card>
      </Grid>
      <Grid item xs={12} md={4}>
        {/* Left Column */}
        <Card>
          <CardHeader title={"Personnel"} />
          <TableContainer component={Paper}>
            <Table style={{ tableLayout: "fixed" }}>
              <TableHead>
                <TableRow>
                  <TableCell>User Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Role</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {personnel.map((id) => {
                  const user = users.find((user) => user._id === id);
                  return (
                    <TableRow key={id}>
                      <TableCell>{user?.name}</TableCell>
                      <TableCell
                        style={{ whiteSpace: "normal", wordWrap: "break-word" }}
                      >
                        {user?.email}
                      </TableCell>
                      <TableCell>{user?.role}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>
      </Grid>
      <Grid item xs={12} md={8}>
        {/* Right Column */}
        <Card>
          <CardHeader
            title={`Tickets for ${name}`}
            action={<TicketCreateModalController project={project} />}
          />
          <TableContainer component={Paper}>
            <Table style={{ tableLayout: "fixed" }}>
              <TableHead>
                <TableRow>
                  <TableCell>Title</TableCell>
                  {!isMobile && <TableCell>Submitter</TableCell>}
                  {!isMobile && <TableCell>Developer</TableCell>}
                  <TableCell>Status</TableCell>
                  {!isMobile && <TableCell>Created</TableCell>}
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tickets.map((ticket) => {
                  const {
                    _id,
                    title,
                    submitterId,
                    personnelId,
                    status,
                    createdAt,
                  } = ticket;
                  const submitter = users.find(
                    (user) => user._id === submitterId
                  );
                  const personnel = users.find(
                    (user) => user._id === personnelId
                  );
                  return (
                    <TableRow key={_id}>
                      <TableCell>{title}</TableCell>
                      {!isMobile && <TableCell>{submitter?.name}</TableCell>}
                      {!isMobile && <TableCell>{personnel?.name}</TableCell>}
                      <TableCell>{status}</TableCell>
                      {!isMobile && (
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
                      )}
                      <TableCell>
                        <TicketEditModalController ticket={ticket} />
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>
      </Grid>
    </Grid>
  );
};

export default ProjectDetailsView;
