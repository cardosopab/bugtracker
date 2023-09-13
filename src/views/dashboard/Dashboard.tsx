import DrawerController from "../../controllers/DrawerController"
import { BarChart } from '@mui/x-charts/BarChart';
import { PieChart } from "@mui/x-charts/PieChart";
import { useSelector } from "react-redux";
import { RootState } from "../../models/redux/store";
import { Card, CardHeader } from "@mui/material";
import { priorityOptions, statusOptions, typeOptions } from "../../constants/ticketConstants";
import { useEffect, useState } from "react";
import Ticket from "../../models/Ticket";

function Dashboard() {
    const barChartParams = { margin: { bottom: 100, left: 40, right: 20 } };
    const tickets = useSelector((state: RootState) => state.tickets.value);
    const users = useSelector((state: RootState) => state.users.value);
    const [priorityCount, setPriorityCount] = useState<number[]>(new Array(priorityOptions.length).fill(0));
    const [statusCount, setStatusCount] = useState<number[]>(new Array(statusOptions.length).fill(0));
    const [topTypeCount, setTopTypeCount] = useState<{ id: number; value: number; label: string; }[]>([]);
    const [topPersonnelCount, setTopPersonnelCount] = useState<{ id: number; value: number; label: string; }[]>([]);

    useEffect(() => {
        const updatedPriorityCount = new Array(priorityOptions.length).fill(0);
        const updatedStatusCount = new Array(statusOptions.length).fill(0);
        const updatedTypeCount: { id: number, value: number; label: string }[] = [];
        const updatedPersonnelCount: { id: number, value: number; label: string }[] = [];

        tickets.forEach((ticket: Ticket) => {
            const priorityIdx = priorityOptions.indexOf(ticket.priority);
            if (priorityIdx !== -1) {
                updatedPriorityCount[priorityIdx] += 1;
            }

            const statusIdx = statusOptions.indexOf(ticket.status);
            if (statusIdx !== -1) {
                updatedStatusCount[statusIdx] += 1;
            }

            const typeIdx = typeOptions.indexOf(ticket.type);
            if (typeIdx !== -1) {
                if (!updatedTypeCount[typeIdx]) {
                    updatedTypeCount[typeIdx] = { id: typeIdx, value: 0, label: typeOptions[typeIdx] };
                }
                updatedTypeCount[typeIdx].value += 1;
            }

            const personnel = users.find((user) => user.id === ticket.personnelId);
            if (personnel) {
                const personnelIdx = users.indexOf(personnel);
                if (personnelIdx !== -1) {
                    if (!updatedPersonnelCount[personnelIdx]) {
                        updatedPersonnelCount[personnelIdx] = { id: personnelIdx, value: 0, label: personnel.name };
                    }
                    updatedPersonnelCount[personnelIdx].value += 1;
                }
            }
        });

        const updatedTopTypeCount = [...updatedTypeCount];
        const updatedTopPersonnelCount = [...updatedPersonnelCount];

        // Sort the arrays to keep only the top 4 objects
        updatedTopTypeCount.sort((a, b) => b.value - a.value);
        updatedTopPersonnelCount.sort((a, b) => b.value - a.value);

        // Update the state variables
        setPriorityCount(updatedPriorityCount);
        setStatusCount(updatedStatusCount);
        setTopTypeCount(updatedTopTypeCount);
        setTopPersonnelCount(updatedTopPersonnelCount);
    }, [tickets, users]);


    return (
        <>
            <DrawerController>
                <div className="column">
                    <div className="row">
                        <Card sx={{ margin: 2 }}>
                            <div className="chart-container">
                                <BarChart
                                    {...barChartParams}
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
                            <CardHeader title="Ticket Status" />
                            <div className="chart-container">
                                <BarChart
                                    {...barChartParams}
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
                        </Card>
                        <Card sx={{ margin: 2 }}>
                            <CardHeader title="Active Personnel" />
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
                        </Card>
                    </div>
                </div >
            </DrawerController>
        </>
    )
}
export default Dashboard