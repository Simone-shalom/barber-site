import Image from "next/image"

interface HeroImageProps {
    src: string
    width: number
}
export const HeroImage = ({src ,width}: HeroImageProps) => {
  return (
    <div className="object-cover h-[300px] w-[350px] flex relative lg:translate-x-12 justify-center">
        <Image src={src}  className="object-cover rounded-2xl shadow-2xl" height={300} width={width} alt="ImageHero"/>
    </div>
  )
}
