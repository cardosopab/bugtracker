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
  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    minWidth: 400,
  };

  return (
    <>
      <Modal open={isModalOpen} onClose={() => handleModalToggle()}>
        <Card sx={style}>
          <CardHeader title="Confirm Project Delete" />
          <Box sx={{ margin: 2 }}>
            <p>Delete: {project.name}</p>
            <Grid style={{ display: "flex", justifyContent: "end" }}>
              <Button onClick={() => handleProjectDelete(project.id)}>
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
