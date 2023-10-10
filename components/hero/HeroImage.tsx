import Image from "next/image"

interface HeroImageProps {
    src: string
}
export const HeroImage = ({src}: HeroImageProps) => {
  return (
    <div className="object-cover h-[300px] w-[400px] lg:w-[350px] xl:w-[400px] flex relative lg:translate-x-12">
        <Image src={src}  fill className="object-cover rounded-2xl shadow-2xl" alt="ImageHero"/>
    </div>
  )
}
