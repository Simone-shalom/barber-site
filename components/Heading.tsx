

interface HeadingProps {
    title?: string;
    desc? : string; 
}

export const Heading = ({title, desc}: HeadingProps) => {
  return (
    <div className="pt-28 flex flex-col items-center justify-center">
        <div className="text-4xl font-semibold">
        {title}
        </div>
        <div className="text-gray-800 text-xl pr-5 pt-1">
        {desc}
        </div>
    </div>
  )
}
