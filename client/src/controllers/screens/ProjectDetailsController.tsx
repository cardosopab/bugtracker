import { RootState } from "../../models/redux/store";
import DrawerController from "../components/DrawerController";
import ProjectDetailsView from "../../views/screens/project_details/ProjectDetailsView";
import { useSelector } from "react-redux/es/hooks/useSelector";

const ProjectDetailsController = () => {
  const details = useSelector((state: RootState) => state.projectDetails.value);
  let tickets = useSelector((state: RootState) => state.tickets.value);
  const users = useSelector((state: RootState) => state.users.value);

  if (details._id === undefined) {
    return (
      <>
        <DrawerController>
          <div className="center">No project was selected.</div>
        </DrawerController>
      </>
    );
  }

  tickets = tickets.filter((ticket) => ticket.projectId === details._id);
  return (
    <>
      <DrawerController>
        <ProjectDetailsView project={details} users={users} tickets={tickets} />
      </DrawerController>
    </>
  );
};

export default ProjectDetailsController;
