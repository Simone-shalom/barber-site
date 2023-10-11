
import HeroHeading from "./HeroHeading"
import TestimonialCard from "./TestimonialCard"


const Testimonials = () => {
  return (
    <div className="pt-10">
      <div className="flex items-center justify-center ">
      <HeroHeading title="What people say about us" desc="" testimonials href=""/>
      </div>
      <div className="pt-5 flex flex-col md:grid md:grid-cols-2 2xl:grid-cols-3 items-center justify-center gap-4">
        <TestimonialCard title="My first visit was amazing, i give it 5/5, gotta come back more times here" name="Simone well" src={'/images/356424777_2566705390160339_4371452317191595663_n.jpg'}/>
        <TestimonialCard title="A Fantastic First Experience: 5/5 Stars - I'll Definitely Return!" name="Alfredo Di Picasso" src={'/images/2c7d99fe281ecd3bcd65ab915bac6dd5.jpeg'}/>
        <TestimonialCard title="Unforgettable First Visit: 5/5 Rating - I'm Hooked and Coming Back for More!" name="Antoine Johansoen" src={'/images/images.jpg'}/>
      </div>
    </div>
  )
}

export default Testimonials