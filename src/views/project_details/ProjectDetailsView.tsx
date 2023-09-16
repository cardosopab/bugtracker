import {
  Box,
  Button,
  Card,
  CardHeader,
  Modal,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Grid,
} from "@mui/material";
import Project from "../../models/Project";
import Ticket from "../../models/Ticket";
import User from "../../models/User";
import CreateTicketController from "../../controllers/CreateTicketController";

interface DetailsProps {
  details: Project;
  users: User[];
  tickets: Ticket[];
  handleTicketRemoval: any;
  handleModal: any;
  open: boolean;
}

const ProjectDetailsView = (props: DetailsProps) => {
  const { details, users, tickets, handleTicketRemoval, handleModal, open } =
    props;
  const name = details.name;
  const personnel = details.personnel;

  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    minWidth: 400,
    bgcolor: "background.paper",
    border: "3px solid #1976d2",
    borderRadius: "1em",
    boxShadow: 24,
    p: 4,
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        {/* Top Row */}
        <Card>
          <CardHeader title={`Details for ${name}`} />
          <Box p={2}>
            {/* Extra Details */}
            <div>
              <h2>Extra Details</h2>
              {/* Add your extra details content here */}
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
                  const user = users.find((user) => user.id === id);
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
            action={
              <div>
                <Button onClick={handleModal} sx={{ color: "white" }}>
                  Create Ticket
                </Button>
                <Modal
                  open={open}
                  onClose={handleModal}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box sx={style}>
                    <CreateTicketController
                      project={details}
                      handleModal={handleModal}
                    />
                  </Box>
                </Modal>
              </div>
            }
          />
          <TableContainer component={Paper}>
            <Table style={{ tableLayout: "fixed" }}>
              <TableHead>
                <TableRow>
                  <TableCell>Title</TableCell>
                  <TableCell>Submitter</TableCell>
                  <TableCell>Developer</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Created</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tickets.map(
                  ({
                    id,
                    title,
                    submitterId,
                    personnelId,
                    status,
                    createdAt,
                  }) => {
                    const submitter = users.find(
                      (user) => user.id === submitterId
                    );
                    const personnel = users.find(
                      (user) => user.id === personnelId
                    );
                    return (
                      <TableRow key={id}>
                        <TableCell>{title}</TableCell>
                        <TableCell>{submitter?.name}</TableCell>
                        <TableCell>{personnel?.name}</TableCell>
                        <TableCell>{status}</TableCell>
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
                          <Button onClick={() => handleTicketRemoval(id)}>
                            Delete
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  }
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>
      </Grid>
    </Grid>
  );
};

export default ProjectDetailsView;
