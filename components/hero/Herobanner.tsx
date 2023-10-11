import { ScissorsSquareDashedBottom } from "lucide-react"
import HeroHeading from "./HeroHeading"
import { HeroIcon } from "./HeroIcon"
import RoundedBlock from "./RoundedBlock"


const Herobanner = () => {
  return (
    <div className="mx-5 md:mx-10 relative lg:mx-20 xl:mx-32 flex flex-col-reverse items-center justify-center lg:flex-row 2xl:mx-64 h-[250px] bg-gradient-to-r from-red-500 to-blue-500 rounded-3xl shadow-2xl hover:opacity-95 hover:scale-105 transition-all   duration-1000">
      {/* left- text section */}
      <div className="hidden lg:flex md:w-1/2 h-full flex-col text-white px-10 items-center justify-center">
        <HeroHeading title="Our services beyond expectations" desc="" href="/home"/>
      </div>
       {/* Right- Icons section */}
       <div className="lg:w-1/2  h-full grid grid-cols-2 text-white px-10  gap-x-12 sm:gap-x-32  md:gap-x-48 lg:gap-x-10  items-center justify-center ">
        <HeroIcon title="Beard" desc="Beard maintance and razor shave" Icon={ScissorsSquareDashedBottom}/>
        <HeroIcon title="Scissors Cut" desc="Longer hair cut with only scissors" Icon={ScissorsSquareDashedBottom}/>
        <HeroIcon title="Fade" desc="Modern fade with trimmer" Icon={ScissorsSquareDashedBottom}/>
        <HeroIcon title="Special" desc="Talk with barber and create Special one" Icon={ScissorsSquareDashedBottom}/>
       </div>
    </div>
  )
}

export default Herobanner