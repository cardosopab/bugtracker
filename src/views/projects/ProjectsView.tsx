import { Button, Card, CardHeader, Input, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Grid, Divider } from "@mui/material";
import DrawerController from "../../controllers/DrawerController";
import { RegisterOptions } from "react-hook-form";
import Project from "../../models/Project";

interface ProjectsViewProps {
  handleSubmit: any;
  navigateToUsers: any;
  navigateToDetails: (project: Project) => void;
  onSubmit: any;
  register: (name: string, options?: RegisterOptions) => any;
  projects: Project[];
  errors: any;
}

function ProjectsView(props: ProjectsViewProps) {
  const { handleSubmit, navigateToUsers, navigateToDetails, onSubmit, register, errors, projects } = props;

  return (
    <DrawerController>
      <Grid container spacing={2} padding={2}>
        {/* Title/Header */}
        <Grid item xs={12}>
          <h1>Manage Projects</h1>
        </Grid>

        {/* First Column */}
        <Grid item xs={12} sm={4}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Input sx={{ marginTop: 2, marginBottom: 2 }} placeholder="Project Name" type="text" {...register('name', { required: "Required" })} />
            {errors.name && <p>{errors.name.message}</p>}
            <Input sx={{ marginTop: 2, marginBottom: 2 }} margin={2} placeholder="Description" type="text" {...register('description', { required: "Required" })} />
            {errors.description && <p>{errors.description.message}</p>}
            <Button variant={'contained'} type="submit" fullWidth>Create Project</Button>
          </form>
        </Grid>

        {/* Second Column */}
        <Grid item xs={12} sm={8}>
          <Card>
            <CardHeader
              title='Projects'
              subheader='You are a part of:'
              style={{ backgroundColor: '#1976d2', color: 'white' }}
              subheaderTypographyProps={{ color: 'white' }}
            />
            {projects.length !== 0 ? (
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Project Name</TableCell>
                      <TableCell>Description</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {projects.map(({ id, name, description, createdAt, personnel }) => (
                      <TableRow key={id}>
                        <TableCell>{name}</TableCell>
                        <TableCell>{description}</TableCell>
                        <TableCell>
                          <div className="column">
                            <Button onClick={() => navigateToUsers()}>Users</Button>
                            <Button onClick={() => navigateToDetails({
                              id: id,
                              name: name,
                              description: description,
                              createdAt: createdAt,
                              personnel: personnel,
                            })}>Details</Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            ) : (
              <p>No Projects found</p>
            )}
          </Card>
        </Grid>
      </Grid>
    </DrawerController>
  );
}

export default ProjectsView;
