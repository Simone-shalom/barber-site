'use client'

import ScrollSlider from "../animations/scrollSlider"
import HeroHeading from "./HeroHeading"
import ServiceCard from "./ServiceCard"


const HeroServices = () => {
  return (
    <>
    <ScrollSlider>
    <div className="mx-10 2xl:mx-52  flex flex-col lg:grid lg:grid-cols-2 pt-10 items-center justify-center gap-y-4">
            <HeroHeading title="See our working hours before visit" desc="Syncronize your calendar with ours, by checkin the open hours" href="/home"/>
            <ServiceCard title="Saturday" desc="We are open from 10 am to 6 pm" src="/images/agustin-fernandez-1Pmp9uxK8X8-unsplash.jpg"/>
            <ServiceCard title="Monday-Wednesday" desc="We are open from 8 am to 8 pm" src="/images/delfina-pan-wJoB8D3hnzc-unsplash.jpg"/>
            <ServiceCard title="Thursday-Friday" desc="We are open from 8 am to 10 pm" src="/images/nathon-oski-fE42nRlBcG8-unsplash (1).jpg"/>
    </div>
    </ScrollSlider>
    </>
  )
}

export default HeroServices