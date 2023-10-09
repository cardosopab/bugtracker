import { Box, Button, Card, CardHeader, Grid, Modal } from "@mui/material";
import Project from "../../../models/Project";

interface ProjectDeleteModalViewProps {
  project: Project;
  isPrimary?: boolean;
  isModalOpen: boolean;
  handleModalToggle: () => void;
  handleProjectDelete: (projectId: string) => void;
}
const ProjectDeleteModalView = ({
  project,
  isPrimary,
  isModalOpen,
  handleModalToggle,
  handleProjectDelete,
}: ProjectDeleteModalViewProps) => {
  return (
    <>
      <Modal open={isModalOpen} onClose={() => handleModalToggle()}>
        <Card className="center" style={{ minWidth: 300 }}>
          <CardHeader title="Confirm Delete" />
          <Box sx={{ margin: 2 }}>
            <p>Project: {project.name}</p>
            <Grid style={{ display: "flex", justifyContent: "end" }}>
              <Button
                onClick={() => handleProjectDelete(project.id)}
                color="error"
              >
                Delete
              </Button>
            </Grid>
          </Box>
        </Card>
      </Modal>
      <Button
        onClick={() => handleModalToggle()}
        sx={isPrimary ? { color: "white" } : { color: "red" }}
      >
        Delete
      </Button>
    </>
  );
};
export default ProjectDeleteModalView;
