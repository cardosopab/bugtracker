// import { Card } from "@mui/material"
import DrawerComponent from "../DrawerComponent"
import { BarChart } from '@mui/x-charts/BarChart';
import { PieChart } from "@mui/x-charts/PieChart";
import { useSelector } from "react-redux";
import { RootState } from "../../models/redux/store";

function Dashboard() {
    const tickets = useSelector((state: RootState) => state.tickets.value);
    const users = useSelector((state: RootState) => state.users.value);

    const priorityOptions: string[] = ['Low', 'Medium', 'High',];
    const typeOptions: string[] = ['Bug/Errors', 'Feature', 'Task', 'Documentation', 'Testing/QA', 'Feedback', 'Duplicate/Invalid'];
    const statusOptions: string[] = ["Unassigned", "In Progress", "Needs Attention", "Ready for Review", "Resolved"]
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
    return (
        <>
            <DrawerComponent />

            <div className="column">
                <div className="row">

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
                        width={700}
                        height={300}
                    />
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
                                cx: 150,
                                cy: 150,
                            },
                        ]}
                        width={400}
                        height={400}
                    />
                </div>
                <div className="row">

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
                        width={700}
                        height={300}
                    />
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
                                cx: 150,
                                cy: 150,
                            },
                        ]}
                        width={400}
                        height={400}
                    />
                </div>
            </div>

        </>
    )
}
export default Dashboard