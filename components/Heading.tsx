

interface HeadingProps {
    title?: string;
    desc? : string; 
}

export const Heading = ({title, desc}: HeadingProps) => {
  return (
    <div className="pt-28">
        <div className="text-3xl font-semibold">
        {title}
        </div>
        <div className="text-gray-800 text-lg pr-5 pt-1">
        {desc}
        </div>
    </div>
  )
}
