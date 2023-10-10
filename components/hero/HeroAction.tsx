import { Brain, CalendarCheck } from "lucide-react"
import HeroHeading from "./HeroHeading"
import { HeroImage } from "./HeroImage"
import { ScoreBox } from "./ScoreBox"
import { CurvyLine } from "../CurvyLine"


const HeroAction = () => {
  return (
    <div className="flex flex-col-reverse lg:flex-row space-y-10 lg:space-y-0 mx-10">
        {/* Left side */}
        <section className="w-full relative lg:w-1/2 flex items-center justify-center lg:justify-start pb-10 ">
            <div className="z-20">
            <HeroImage src={'/images/jeppe-monster-T_gTN3Po9RQ-unsplash.jpg'} width={250} />
            </div>
            <div className="absolute z-30 bottom-0 lg:bottom-40 lg:right-10 xl:right-32 ">
                <ScoreBox title="Visits" desc="Create reservation anytime anyday " icon={CalendarCheck} action/>
            </div>
            <div className="z-10 hidden lg:block absolute lg:-right-32 xl:right-20 bottom-0">
              <CurvyLine />
            </div>
        </section>


        {/* Right side */}
        <section className="w-full lg:w-1/2 items-center justify-center flex pb-10">
        <HeroHeading title="Making reservations" desc="Plenty of available cuts directly in your hand, make reservations on chosen time" href="/home"/>
        </section>
    </div>
  )
}

export default HeroAction