import { Card, CardHeader } from "@mui/material";
import { BarChart } from "@mui/x-charts/BarChart";
import { PieChart } from "@mui/x-charts/PieChart";
import DrawerController from "../../../controllers/components/DrawerController";
import {
  priorityOptions,
  statusOptions,
} from "../../../constants/ticketConstants";
import Project from "../../../models/Project";

interface DashboardViewProps {
  projects: Project[];
  priorityCount: number[];
  statusCount: number[];
  typeCount: {
    id: number;
    value: number;
    label: string;
  }[];
  personnelCount: {
    id: number;
    value: number;
    label: string;
  }[];
}

function DashboardView({
  projects,
  priorityCount,
  statusCount,
  typeCount,
  personnelCount,
}: DashboardViewProps) {
  const barChartParams = { margin: { bottom: 100, left: 40, right: 20 } };

  return (
    <DrawerController>
      {projects.length > 0 ? (
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
      ) : (
        <Card className="center">
          <CardHeader title="No Projects have been created yet!" />
        </Card>
      )}
    </DrawerController>
  );
}

export default DashboardView;
