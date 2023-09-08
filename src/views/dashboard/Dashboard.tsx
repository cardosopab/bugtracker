import DrawerController from "../../controllers/DrawerController"
import { BarChart } from '@mui/x-charts/BarChart';
import { PieChart } from "@mui/x-charts/PieChart";
import { useSelector } from "react-redux";
import { RootState } from "../../models/redux/store";
import { Card, CardHeader } from "@mui/material";
import { priorityOptions, statusOptions, typeOptions } from "../../constants/ticketConstants";

function Dashboard() {
    const tickets = useSelector((state: RootState) => state.tickets.value);
    const users = useSelector((state: RootState) => state.users.value);

    const priorityCount: number[] = new Array(priorityOptions.length).fill(0);
    const statusCount: number[] = new Array(statusOptions.length).fill(0);
    const typeCount: { id: number, value: number; label: string }[] = [];
    const personnelCount: { id: number, value: number; label: string }[] = [];
    tickets.forEach(ticket => {
        const priorityIdx = priorityOptions.indexOf(ticket.priority);
        if (priorityIdx !== -1) {
            priorityCount[priorityIdx] += 1;
        }

        const statusIdx = statusOptions.indexOf(ticket.status);
        if (statusIdx !== -1) {
            statusCount[statusIdx] += 1;
        }

        const typeIdx = typeOptions.indexOf(ticket.type);
        if (typeIdx !== -1) {
            if (!typeCount[typeIdx]) {
                typeCount[typeIdx] = { id: typeIdx, value: 0, label: typeOptions[typeIdx] };
            }
            typeCount[typeIdx].value += 1;
        }

        const personnel = users.find(user => user.id === ticket.personnelId);
        if (personnel != undefined) {

            const personnelIdx = users.indexOf(personnel!);
            if (personnelIdx !== -1) {
                if (!personnelCount[personnelIdx]) {
                    personnelCount[personnelIdx] = { id: personnelIdx, value: 0, label: personnel.name };
                }
                personnelCount[personnelIdx].value += 1;
            }
        }
        console.log('assignmentCount', personnelCount)
    });

    typeCount.sort((a, b) => b.value - a.value);
    personnelCount.sort((a, b) => b.value - a.value);

    // Slice the arrays to keep only the top 4 objects
    const topTypeCount = typeCount.slice(0, 4);
    const topPersonnelCount = personnelCount.slice(0, 4);
    return (
        <>
            <DrawerController>
                <div className="column">
                    <div className="row">
                        <Card sx={{ margin: 2 }}>
                            <div className="chart-container">

                                <BarChart
                                    title="Ticket Priority"
                                    xAxis={[
                                        {
                                            id: 'priority',
                                            data: priorityOptions,
                                            scaleType: 'band',
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
                                            data: topTypeCount,
                                            innerRadius: 40,
                                            outerRadius: 100,
                                            paddingAngle: 1,
                                            cornerRadius: 5,
                                            startAngle: -180,
                                            endAngle: 180,

                                        },
                                    ]}
                                    legend={{
                                        direction: 'column',
                                        offset: { x: 150, y: 150 }
                                    }}
                                />
                            </div>
                            <CardHeader title="Ticket Type" />
                        </Card>
                    </div>
                    <div className="row">
                        <Card sx={{ margin: 2 }}>
                            <div className="chart-container">
                                <BarChart
                                    title="Ticket Status"
                                    xAxis={[
                                        {
                                            id: 'status',
                                            data: statusOptions,
                                            scaleType: 'band',
                                        },
                                    ]}
                                    series={[
                                        {
                                            data: statusCount,
                                        },
                                    ]}
                                />
                            </div>
                            <CardHeader title="Ticket Status" />
                        </Card>
                        <Card sx={{ margin: 2 }}>
                            <div className="chart-container">
                                <PieChart
                                    series={[
                                        {
                                            data: topPersonnelCount,
                                            innerRadius: 40,
                                            outerRadius: 100,
                                            paddingAngle: 1,
                                            cornerRadius: 5,
                                            startAngle: -180,
                                            endAngle: 180,
                                        },
                                    ]}
                                    legend={{
                                        direction: 'column',
                                        offset: { x: 150, y: 150 }
                                    }}
                                />
                            </div>
                            <CardHeader title="Active Personnel" />
                        </Card>
                    </div>
                </div >
            </DrawerController>
        </>
    )
}
export default Dashboard