import Image from "next/image"
import { Card } from "../ui/card"
import { BarChartIcon, LucideIcon } from "lucide-react"

interface ScoreBoxprops {
  icon: LucideIcon
  title:  string
  desc: string
  action?: boolean 
}

export const ScoreBox = ({title, desc, icon: Icon, action}: ScoreBoxprops) => {

  const cardClasses = `flex ${action ? 'flex-col' : ''}  pt-2 items-center px-3 rounded-2xl opacity-95 hover:scale-110 transition duration-500`;

  return (
    <div className=" rounded-md shadow-xl w-48">
      <Card className={cardClasses}>
        <div className="w-1/2  flex items-center justify-center rounded-2xl">
        <Icon  width={80} height={50} color="purple" className="object-cover"/>
        </div>

        <div className=" flex flex-col text-center py-2">

        <h1 className="text-xl font-bold">
          {title}
        </h1>
        <p className="text-muted-foreground text-sm">
        {desc}
        </p>
        </div>
      </Card>
    </div>
  )
}
