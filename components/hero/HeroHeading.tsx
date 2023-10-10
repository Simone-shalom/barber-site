import { Button } from "../ui/button";


interface HeroHeadingProps {
    title: string;
    desc: string;
    href: string
}

const HeroHeading = ({title, desc, href}: HeroHeadingProps) => {
  return (
    <div className="flex flex-col space-y-4 text-center">
        <h1 className="text-4xl font-bold ">
           {title} 
        </h1>
        <p className="text-muted-foreground text-lg">
            {desc}
        </p>
        <div className="flex items-center justify-center">
        <Button variant='landing' className="w-40 rounded-xl">
            Get started
        </Button>
        </div>
    </div>
  )
}

export default HeroHeading