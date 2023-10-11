import { Avatar, AvatarImage } from "../ui/avatar"
import { Card } from "../ui/card"


interface TestimonialCardProps {
    title: string
    name: string
    src: string
}

const TestimonialCard = ({title, name, src}: TestimonialCardProps) => {
  return (
    <div className="flex max-w-lg items-center justify-center mx-10 md:mx-0 xl:mx-10 ">
        <Card className="p-5 w-[400px] rounded-2xl flex space-x-10 items-center shadow-2xl hover:scale-110 hover:translate-x-2 transition duration-700">
        {/* Image */}
        <div className="flex items-center justify-center">
        <Avatar>
            <AvatarImage src={src}/>
        </Avatar>

        </div>
        {/* text */}
        <div className="flex flex-col ">
            <p className="text-muted-foreground text-sm">
             {title}
            </p>
            <h1 className="text-lg">
                {name}
            </h1>
        </div>
        </Card> 
    </div>
  )
}

export default TestimonialCard