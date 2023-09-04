import { Button, Card, CardHeader, Input, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import DrawerComponent from "../DrawerComponent"
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
    <>
      <DrawerComponent />
      <div className="row">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input placeholder="Project Name" type="text" {...register('name', { required: "Required" })} />
          {errors.name && <p>{errors.name.message}</p>}
          <Input placeholder="Description" type="text" {...register('description', { required: "Required" })} style={{ margin: '0 1em' }} />
          {errors.description && <p>{errors.description.message}</p>}
          <Button variant={'contained'} type="submit" >Create Project</Button>
        </form>
      </div>
      <Card style={{ margin: '1em' }}>
        <CardHeader title='Projects' subheader='You are a part of:' style={{ backgroundColor: '#1976d2', color: 'white', }} subheaderTypographyProps={{ color: 'white' }} />
        {
          projects.length !== 0 ?
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Project Name</TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell></TableCell>
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
            :
            <p>No Projects found</p>
        }
      </Card>
    </>
  )
}

export default ProjectsView;