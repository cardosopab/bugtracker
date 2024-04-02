import { useSelector } from "react-redux";
import { RootState } from "../../models/redux/store";
import { useEffect, useState } from "react";
import DashboardView from "../../views/screens/dashboard/DashboardView";
import { SelectChangeEvent } from "@mui/material";
import { useProjectActions } from "../../models/database/hooks/useProjectActions";
import { useDashboardActions } from "../../models/database/hooks/useDashboardActions";
import Project from "../../models/Project";

const DashboardController = () => {
  const { readProjectData } = useDashboardActions();
  const { readCompanyProjects } = useProjectActions();
  const companyId = useSelector(
    (state: RootState) => state.auth.currentUser!.companyId
  );
  const projects = useSelector((state: RootState) => state.projects.value);
  const [selectedProject, setSelectedProject] = useState<Project | undefined>(
    undefined
  );
  const [priorityCount, setPriorityCount] = useState<number[] | undefined>(
    undefined
  );
  const [statusCount, setStatusCount] = useState<number[] | undefined>(
    undefined
  );
  const [typeCount, setTypeCount] = useState<
    { id: number; value: number; label: string }[] | undefined
  >(undefined);
  const [personnelCount, setPersonnelCount] = useState<
    { id: number; value: number; label: string }[] | undefined
  >(undefined);

  useEffect(() => {
    readCompanyProjects(companyId);
  }, [companyId]);

  useEffect(() => {
    if (projects.length > 0 && !selectedProject) {
      setSelectedProject(projects[0]);
    }
  }, [projects, selectedProject]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (selectedProject) {
          const data = await readProjectData(selectedProject!._id);
          // Update the state variables
          setPriorityCount(data.priorityCount);
          setStatusCount(data.statusCount);
          setTypeCount(data.typeCount);
          setPersonnelCount(data.topPersonnelCount);
        }
      } catch (error) {
        console.error("Error fetching project data:", error);
      }
    };

    if (selectedProject) {
      fetchData();
    }
  }, [selectedProject]);

  const handleProjectDropdown = (event: SelectChangeEvent) => {
    const selectedProjectName = event.target.value as string;
    const selectedProjectObj = projects.find(
      (project) => project.name === selectedProjectName
    );

    if (selectedProjectObj) {
      setSelectedProject(selectedProjectObj);
    }
  };
  return (
    <>
      <DashboardView
        projects={projects}
        priorityCount={priorityCount}
        statusCount={statusCount}
        typeCount={typeCount}
        personnelCount={personnelCount}
        selectedProject={selectedProject}
        handleProjectDropdown={handleProjectDropdown}
      />
    </>
  );
};
export default DashboardController;
