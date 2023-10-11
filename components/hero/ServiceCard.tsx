import Image from "next/image"
import { Card } from "../ui/card"


interface ServiceCardProps {
    title: string
    desc: string
    src: string
}

const ServiceCard = ({src, title, desc}: ServiceCardProps) => {
  return (
    <div className="flex items-center justify-center">
        <Card className="p-3 md:mx-10 max-w-lg rounded-xl">
            <Image src={src} width={500} height={200} className="object-cover aspect-video rounded-2xl" alt=""/>
            <div className="flex flex-col max-w-xs pt-1">
                <h1 className="text-2xl font-semibold">
                {title}
                </h1>
                <p className="text-muted-foreground">
                {desc}
                </p>
            </div>
        </Card>
        </div>
  )
}

export default ServiceCard