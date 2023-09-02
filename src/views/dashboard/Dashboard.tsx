// import { Card } from "@mui/material"
import DrawerComponent from "../DrawerComponent"
import { BarChart } from '@mui/x-charts/BarChart';
import { PieChart } from "@mui/x-charts/PieChart";
import { useSelector } from "react-redux";
import { RootState } from "../../models/redux/store";

function Dashboard() {
    // const graphics = ['Priorty', 'Type', 'Progress', 'Completion']
    console.log('Dashboard.tsx')
    const tickets = useSelector((state: RootState) => state.tickets.value);

    const priorities: string[] = ['Low', 'Medium', 'High',];
    const ticketTypes: string[] = ['Bug/Errors', 'Feature', 'Task', 'Documentation', 'Testing/QA', 'Feedback', 'Duplicate/Invalid'];
    const priorityCount: number[] = [0, 0, 0];
    const typeCount: { id: number, value: number; label: string }[] = [];
    tickets.forEach(ticket => {
        const priorityIdx = priorities.indexOf(ticket.priority);
        if (priorityIdx !== -1) {
            priorityCount[priorityIdx] += 1;
        }

        const typeIdx = ticketTypes.indexOf(ticket.type);
        if (typeIdx !== -1) {
            if (!typeCount[typeIdx]) {
                typeCount[typeIdx] = { id: typeIdx, value: 0, label: ticketTypes[typeIdx] };
            }
            typeCount[typeIdx].value += 1;
        }
    });
    return (
        <>
            <DrawerComponent />
            <BarChart
                title="Ticket Priority"
                xAxis={[
                    {
                        id: 'priority',
                        data: priorities,
                        scaleType: 'band',
                    },
                ]}
                series={[
                    {
                        data: priorityCount,
                    },
                ]}
                width={500}
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

        </>
    )
}
export default Dashboard