import {
  Button,
  Card,
  CardHeader,
  Input,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Grid,
} from "@mui/material";
import DrawerController from "../../../controllers/components/DrawerController";
import {
  FieldValues,
  RegisterOptions,
  UseFormHandleSubmit,
} from "react-hook-form";
import Project from "../../../models/Project";
import ProjectDeleteModalController from "../../../controllers/components/ProjectDeleteModalController";

interface ProjectsViewProps {
  handleSubmit: UseFormHandleSubmit<FieldValues, undefined>;
  navigateToDetails: (project: Project) => void;
  onSubmit: (values: any) => void;
  register: (name: string, options?: RegisterOptions) => any;
  projects: Project[];
  errors: any;
}

const ProjectsView = ({
  handleSubmit,
  navigateToDetails,
  onSubmit,
  register,
  errors,
  projects,
}: ProjectsViewProps) => {
  return (
    <DrawerController>
      <Grid container spacing={2} padding={2}>
        {/* Title/Header */}
        <Grid item xs={12}>
          <h1>Projects Overview</h1>
        </Grid>

        {/* First Column */}
        <Grid item xs={12} sm={4}>
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
        </Grid>

        {/* Second Column */}
        <Grid item xs={12} sm={8}>
          <Card>
            <CardHeader
              title="Projects"
              subheader="You are a part of:"
              style={{ backgroundColor: "#1976d2", color: "white" }}
              subheaderTypographyProps={{ color: "white" }}
            />
            {projects.length !== 0 ? (
              <TableContainer component={Paper}>
                <Table style={{ tableLayout: "fixed" }}>
                  <TableHead>
                    <TableRow>
                      <TableCell>Project Name</TableCell>
                      <TableCell>Description</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {projects.map((project) => {
                      const {
                        _id,
                        name,
                        description,
                      } = project;
                      return (
                        <TableRow key={_id}>
                          <TableCell>{name}</TableCell>
                          <TableCell>{description}</TableCell>
                          <TableCell>
                            <div className="column">
                              <Button
                                onClick={() => navigateToDetails(project)}
                              >
                                Details
                              </Button>
                              <ProjectDeleteModalController project={project} />
                            </div>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            ) : (
              <p style={{ textAlign: "center" }}>No Projects found</p>
            )}
          </Card>
        </Grid>
      </Grid>
    </DrawerController>
  );
};

export default ProjectsView;
