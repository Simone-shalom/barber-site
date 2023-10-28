
import HeroHeading from "./HeroHeading"



const AdvertBlock = () => {
  return (
    <div className="flex items-center justify-center">
    <div className="bg-gradient-to-r from-red-500 to-blue-500 max-w-4xl flex items-center justify-center rounded-3xl shadow-2xl hover:scale-105 transition  duration-500 ">
       <div className="flex flex-col items-center justify-center text-white font-serif px-5 py-2 ">
        <HeroHeading title="Experience Exceptional Services and Beyond: Your Ultimate Barber App" desc="" href="/home"/>
        </div>
    </div>
    </div>
  )
}

export default AdvertBlock