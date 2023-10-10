import Image from "next/image"
import { Card } from "../ui/card"
import { BarChartIcon, LucideIcon } from "lucide-react"

interface ScoreBoxprops {
  icon: LucideIcon
  title:  string
  desc: string 
}

export const ScoreBox = ({title, desc, icon: Icon}: ScoreBoxprops) => {
  return (
    <div className=" rounded-md shadow-xl">
      <Card className="flex items-center px-3 space-x-3 rounded-2xl opacity-95 ">
        <div className="w-1/2  flex items-center justify-center rounded-2xl">
        <Image  src='/images/percetnIcon.png' alt="" width={80} height={80} className="object-cover"/>
        </div>

        <div className="w-1/2 flex flex-col text-center py-2">

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
