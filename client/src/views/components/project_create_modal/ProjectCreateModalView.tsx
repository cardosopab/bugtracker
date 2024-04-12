import { Box, Button, Card, CardHeader, Input, Modal } from "@mui/material";
import {
  FieldValues,
  RegisterOptions,
  UseFormHandleSubmit,
} from "react-hook-form";

interface ProjectCreateModalViewProps {
  isPrimary?: boolean;
  handleSubmit: UseFormHandleSubmit<FieldValues, undefined>;
  onSubmit: (values: any) => void;
  register: (name: string, options?: RegisterOptions) => any;
  errors: any;
  isModalOpen: boolean;
  handleModalToggle: () => void;
}
const ProjectCreateModalView = ({
  isPrimary,
  handleSubmit,
  onSubmit,
  register,
  errors,
  isModalOpen,
  handleModalToggle,
}: ProjectCreateModalViewProps) => {
  return (
    <>
      <Modal open={isModalOpen} onClose={() => handleModalToggle()}>
        <Card className="center" style={{ minWidth: 300 }}>
          <CardHeader title="Confirm Create" />
          <Box sx={{ margin: 2 }}>
            <form
              onSubmit={handleSubmit(onSubmit)}
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <Input
                sx={{ marginTop: 2, marginBottom: 2 }}
                placeholder="Project Name"
                type="text"
                {...register("name", { required: "Required" })}
              />
              {errors.name && <p>{errors.name.message}</p>}
              <br />
              <Input
                sx={{ marginTop: 2, marginBottom: 2 }}
                placeholder="Description"
                type="text"
                {...register("description", { required: "Required" })}
              />
              {errors.description && <p>{errors.description.message}</p>}
              <Button
                variant={"contained"}
                type="submit"
                fullWidth
                sx={{ marginTop: 2 }}
              >
                Create Project
              </Button>
            </form>
          </Box>
        </Card>
      </Modal>
      <Button
        onClick={() => handleModalToggle()}
        sx={isPrimary ? { color: "white" } : { color: "red" }}
      >
        Create Project
      </Button>
    </>
  );
};
export default ProjectCreateModalView;
