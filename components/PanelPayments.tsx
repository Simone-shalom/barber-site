import { CalendarCheck, DollarSign } from "lucide-react"
import { HeroImage } from "./hero/HeroImage"
import { ScoreBox } from "./hero/ScoreBox"
import Link from "next/link"
import { Url } from "next/dist/shared/lib/router/router"
import { PurchasedItem } from "@/types/types"

interface PanelPaymentsProps {
    purchased: PurchasedItem[]
}

export const PanelPayments = ({purchased}: PanelPaymentsProps) => {

    // Calculate the total of all prices
const totalPaid = purchased.reduce((total, item) => total + item.reservation.price, 0);

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
        <Link 
            data-testid="stripe-link"
            href={stripeLink} className="text-xl" target="_blank">
            Stripe
        </Link>
        </div>
        <div className="flex pb-3 items-center justify-center space-x-3">
            <h1 className="text-lg text-muted-foreground">
                All paid visits with stripe
            </h1>
            <p className="text-lg flex font-bold">
            {totalPaid}
            <DollarSign />
            </p>
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
