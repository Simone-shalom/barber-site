import { CalendarCheck } from "lucide-react"
import { HeroImage } from "./hero/HeroImage"
import { ScoreBox } from "./hero/ScoreBox"
import Link from "next/link"
import { Url } from "next/dist/shared/lib/router/router"


export const PanelPayments = () => {

    const stripeLink = process.env.PRODUCTION === 'true'
        ? process.env.STRIPE_ACCOUNT_LINK as Url
        : "https://stripe.com/en-pl"

  return (
    <>
        <h1 className="text-3xl font-semibold py-3 text-center">
            Payments
        </h1>
        <div className="flex flex-col items-center justify-center">
        <h2 className="text-muted-foreground text-center text-xl">
            Link to Stripe account in production 
        </h2>
        <Link href={stripeLink} className="text-xl" target="_blank">
            Stripe
        </Link>
        </div>
        <section className="w-full relative ">
            <div className="z-20 flex items-center justify-center">
                <HeroImage src={'/images/jeppe-monster-T_gTN3Po9RQ-unsplash.jpg'} width={250} />
            </div>
            <div className="absolute z-30 bottom-0 lg:-bottom-10 ">
                <ScoreBox title="Visits" desc="Create reservation anytime anyday " icon={CalendarCheck} action/>
            </div>
        </section>
    </>
  )
}
