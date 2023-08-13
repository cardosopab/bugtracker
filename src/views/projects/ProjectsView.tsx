import { Button, Card, CardHeader, Input, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import DrawerComponent from "../DrawerComponent"
import { RegisterOptions } from "react-hook-form";
import Project from "../../models/Project";

interface ProjectsViewProps {
  handleSubmit: any;
  onSubmit: any;
  register: (name: string, options?: RegisterOptions) => any;
  projects: Project[];
  errors: any;
}

function ProjectsView(props: ProjectsViewProps) {
  const { handleSubmit, onSubmit, register, errors, projects } = props;
  return (
    <>
      <DrawerComponent />
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input type="text" {...register('name', { required: "Required" })} />
        {errors.name && <p>{errors.name.message}</p>}
        <Input type="text" {...register('description', { required: "Required" })} />
        {errors.description && <p>{errors.description.message}</p>}
        <Button variant={'contained'} type="submit" >Create Project</Button>
      </form>
      <Card style={{ margin: '1em' }}>
        <CardHeader title='Projects' subheader='Projects you are a part of:' style={{ backgroundColor: '#1976d2', color: 'white', }} subheaderTypographyProps={{ color: 'white' }} />
        {
          projects.length !== 0 ?
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Project Name</TableCell>
                    <TableCell>Description</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {projects.map(({ id, name, description }) => (
                    <TableRow key={id}>
                      <TableCell>{name}</TableCell>
                      <TableCell>{description}</TableCell>
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