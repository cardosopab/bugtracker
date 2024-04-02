import {
  Card,
  CardHeader,
  FormControl,
  InputLabel,
  SelectChangeEvent,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { BarChart } from "@mui/x-charts/BarChart";
import { PieChart } from "@mui/x-charts/PieChart";
import {
  priorityOptions,
  statusOptions,
} from "../../../constants/ticketConstants";
import Project from "../../../models/Project";
import KanbanSelect from "../kanban/KanbanSelect";

interface DashboardViewProps {
  selectedProject: Project | undefined;
  handleProjectDropdown: (even: SelectChangeEvent) => void;
  projects: Project[];
  priorityCount: number[] | undefined;
  statusCount: number[] | undefined;
  typeCount:
    | {
        id: number;
        value: number;
        label: string;
      }[]
    | undefined;
  personnelCount:
    | {
        id: number;
        value: number;
        label: string;
      }[]
    | undefined;
}

const DashboardView = ({
  selectedProject,
  handleProjectDropdown,
  projects,
  priorityCount,
  statusCount,
  typeCount,
  personnelCount,
}: DashboardViewProps) => {
  // Check for lg screen
  const theme = useTheme();
  const isLarge = useMediaQuery(theme.breakpoints.down("lg"));
  const barChartParams = isLarge
    ? { margin: { bottom: 100, left: 40, right: 20 } }
    : { margin: { bottom: 50, left: 40, right: 400 } };
  const pieChartParams = isLarge
    ? {}
    : { margin: { bottom: 50, left: 40, right: 400 } };
  return (
    <>
      {projects.length > 0 &&
      selectedProject &&
      priorityCount &&
      statusCount &&
      typeCount &&
      personnelCount ? (
        <>
          <CardHeader
            title={
              <FormControl margin={"normal"} sx={{ minWidth: 200 }}>
                <InputLabel
                  id="project-dropdown-label"
                  sx={{
                    color: "white",
                    "&.Mui-focused": {
                      color: "white",
                    },
                  }}
                >
                  Select a Project
                </InputLabel>
                <KanbanSelect
                  selectedProject={selectedProject}
                  projects={projects}
                  handleProjectDropdown={handleProjectDropdown}
                />
              </FormControl>
            }
            action={
              <>
                {/* <UserAddModalController projectId={selectedProject._id} />
                <TicketCreateModalController project={selectedProject} /> */}
              </>
            }
          />
          <div className="column">
            <div className="row">
              <Card sx={{ margin: 2 }}>
                <div className="chart-container">
                  <BarChart
                    {...barChartParams}
                    title="Ticket Priority"
                    xAxis={[
                      {
                        id: "priority",
                        data: priorityOptions,
                        scaleType: "band",
                      },
                    ]}
                    series={[
                      {
                        data: priorityCount,
                      },
                    ]}
                  />
                </div>
                <CardHeader title="Ticket Priority" />
              </Card>
              <Card sx={{ margin: 2 }}>
                <div className="chart-container">
                  <PieChart
                    {...pieChartParams}
                    series={[
                      {
                        data: typeCount,
                        innerRadius: 40,
                        outerRadius: 100,
                        paddingAngle: 1,
                        cornerRadius: 5,
                        startAngle: -180,
                        endAngle: 180,
                      },
                    ]}
                    legend={{
                      direction: "column",
                      offset: { x: 150, y: 150 },
                    }}
                  />
                </div>
                <CardHeader title="Ticket Type" />
              </Card>
            </div>
            <div className="row">
              <Card sx={{ margin: 2 }}>
                <CardHeader title="Ticket Status" />
                <div className="chart-container">
                  <BarChart
                    {...barChartParams}
                    title="Ticket Status"
                    xAxis={[
                      {
                        id: "status",
                        data: statusOptions,
                        scaleType: "band",
                      },
                    ]}
                    series={[
                      {
                        data: statusCount,
                      },
                    ]}
                  />
                </div>
              </Card>
              <Card sx={{ margin: 2 }}>
                <CardHeader title="Active Personnel" />
                <div className="chart-container">
                  <PieChart
                    {...pieChartParams}
                    series={[
                      {
                        data: personnelCount,
                        innerRadius: 40,
                        outerRadius: 100,
                        paddingAngle: 1,
                        cornerRadius: 5,
                        startAngle: -180,
                        endAngle: 180,
                      },
                    ]}
                    legend={{
                      direction: "column",
                      offset: { x: 150, y: 150 },
                    }}
                  />
                </div>
              </Card>
            </div>
          </div>
        </>
      ) : (
        <Card className="center">
          <CardHeader title="No Projects have been created yet!" />
        </Card>
      )}
    </>
  );
};

export default DashboardView;
