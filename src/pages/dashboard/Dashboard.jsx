import { Ellipsis, File, FolderClosed } from "lucide-react"
import { Card } from "../../components/cards/Card"
import { LineChartCard } from "../../components/charts/LineChartCard"
import { DonutChartCard } from "../../components/charts/DonutChartCard"

export const Dashboard = () => {
    
    const CardContent = [
        {
            icon: <FolderClosed strokeWidth={3} />,
            label: "Studio Work",
            mb: 2.3,
            item: 3,
        },
        {
            icon: <File size={30} />,
            label: "Source",
            mb: 2.3,
            item: 3,
        },
        {
            icon: <File size={30} />,
            label: "Brand Assests",
            mb: 2.3,
            item: 3,
        },
        {
            icon: <File size={30} />,
            label: "Great Studio Pritch",
            mb: 2.3,
            item: 3,
        },
    ]



    return (
        <div className="flex flex-col items-start justify-end">

            <div className="rounded-lg w-full bg-cl-primary p-2 py-2.5">
                <div className="flex items-center justify-between">
                    <h1 className="text-xl">Quick Access</h1>
                    <span> <Ellipsis size={16} /> </span>
                </div>

            <div className="flex sm:flex-wrap items-center gap-4 mt-4">
                {CardContent.map((card) => (
                    <Card key={card.label} label={card.label} icon={card.icon} mb={card.mb} item={card.item} />
                ))}
            </div>
            </div>

            <div className="rounded-lg w-full bg-cl-primary p-2 py-2.5 mt-3">
                <div className="grid grid-cols-2 gap-3">
                    <DonutChartCard />
                    <LineChartCard />
                </div>
            </div>
            


        </div>
    )
}