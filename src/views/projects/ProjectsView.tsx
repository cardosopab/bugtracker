import { Button, Card, CardHeader, List, ListItem, ListItemButton, ListItemText } from "@mui/material"
import DrawerComponent from "../DrawerComponent"
import { RegisterOptions } from "react-hook-form";

interface ProjectsViewProps {
  handleSubmit: any; // Replace with the correct type for handleSubmit
  onSubmit: any; // Replace with the correct type for onSubmit
  register: (name: string, options?: RegisterOptions) => any;
  projects: { name: string; description: string; }[];
  errors: any;
}

function ProjectsView(props: ProjectsViewProps) {
  const { handleSubmit, onSubmit, register, errors, projects } = props;
  return (
    <>
      <DrawerComponent />
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="text" {...register('name', { required: "Required" })} />
        {errors.name && <p>{errors.name.message}</p>}
        <input type="text" {...register('description', { required: "Required" })} />
        {errors.description && <p>{errors.description.message}</p>}
        <Button variant={'contained'} type="submit" >Create Project</Button>
      </form>
      <Card style={{ margin: '1em' }}>
        <CardHeader title='Projects' subheader='Projects you are a part of:' style={{ backgroundColor: '#1976d2', color: 'white', }} subheaderTypographyProps={{ color: 'white' }} />
        {
          projects.length !== 0 ?
            <List>
              {projects.map(({ name, description }) => (
                <ListItem key={name} disablePadding >
                  <ListItemButton>
                    <ListItemText primary={name + ': ' + description} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List> :
            <p>No Projects found</p>
        }
      </Card>
    </>
  )
}

export default ProjectsView;