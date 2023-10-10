import RoundedBlock from "./RoundedBlock"
import HeroHeading from "./HeroHeading"
import { HeroImage } from "./HeroImage"
import { ScoreBox } from "./ScoreBox"
import { BarChart4 } from "lucide-react"


const HeroTop = () => {
  return (
    <div className="flex flex-col lg:flex-row space-y-10 lg:space-y-0 mx-10">
        {/* Left side */}
        <section className="w-full lg:w-1/2 items-center justify-center flex">
        <HeroHeading title="Feel Yourself in a complete new style" desc="We are providing the best possible services for our customers" href="/home"/>
        </section>

        {/* Right side */}
        <section className="w-full relative lg:w-1/2 flex items-center justify-center pb-10 ">
            <div className="z-20">
            <HeroImage src={'/images/pexels-photo-2608582.jpeg'} width={350}/>
            </div>
            <div className="z-10 absolute top-5 lg:right-0 lg:left-10 xl:left-20   ">
            <RoundedBlock/>
            </div>
            <div className="absolute z-30 -bottom-5 lg:bottom-5 lg:left-5">
                <ScoreBox title="Ratings" desc="How clients rate us" icon={BarChart4}/>
            </div>
        </section>
    </div>
  )
}

export default HeroTop