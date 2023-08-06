import { Card } from "@mui/material"
import DrawerComponent from "../DrawerComponent"

function Dashboard() {
    const graphics = ['Priorty', 'Type', 'Progress', 'Completion']
    console.log('Dashboard.tsx')
    return (
        <>
            <DrawerComponent />
            <div className="dashboard-grid">
                {graphics.map((card) => {
                    return <Card key={card}>{card}</Card>
                })}
            </div>
        </>
    )
}
export default Dashboard