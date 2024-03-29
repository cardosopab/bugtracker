import { MenuItem, Select, SelectChangeEvent } from "@mui/material";
import Project from "../../../models/Project";

interface SelectTypes {
  selectedProject: Project;
  projects: Project[];
  handleProjectDropdown: (event: SelectChangeEvent) => void;
}
const KanbanSelect = ({
  selectedProject,
  projects,
  handleProjectDropdown,
}: SelectTypes) => {
  return (
    <Select
      labelId="project-dropdown-label"
      value={selectedProject.name}
      name={selectedProject.name}
      label="Select a Project"
      onChange={handleProjectDropdown}
      sx={{
        color: "white",
        ".MuiOutlinedInput-notchedOutline": {
          borderColor: "rgba(228, 219, 233, 0.25)",
        },
        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
          borderColor: "rgba(228, 219, 233, 0.25)",
        },
        "&:hover .MuiOutlinedInput-notchedOutline": {
          borderColor: "rgba(228, 219, 233, 0.25)",
        },
        ".MuiSvgIcon-root ": {
          fill: "white !important",
        },
      }}
    >
      {projects.map((option) => (
        <MenuItem key={option._id} value={option.name}>
          {option.name}
        </MenuItem>
      ))}
    </Select>
  );
};
export default KanbanSelect;
