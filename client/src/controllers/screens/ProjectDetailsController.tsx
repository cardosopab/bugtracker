import { RootState } from "../../models/redux/store";
import ProjectDetailsView from "../../views/screens/project_details/ProjectDetailsView";
import { useSelector } from "react-redux/es/hooks/useSelector";

const ProjectDetailsController = () => {
  const details = useSelector((state: RootState) => state.projectDetails.value);
  let tickets = useSelector((state: RootState) => state.tickets.tickets);
  const users = useSelector((state: RootState) => state.users.value);

  if (details._id === undefined) {
    return (
      <>
        <div className="center">No project was selected.</div>
      </>
    );
  }

  tickets = tickets.filter((ticket) => ticket.projectId === details._id);
  return (
    <>
      <ProjectDetailsView project={details} users={users} tickets={tickets} />
    </>
  );
};

export default ProjectDetailsController;
