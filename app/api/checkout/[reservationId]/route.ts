import Stripe from "stripe";
import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";

import { stripe } from "@/lib/stripe";
import getCurrentUser from "@/actions/get-current-user";

export async function POST(
  req: Request,
  { params }: { params: { reservationId: string } }
) {
  try {
    const user = await getCurrentUser();

    if (!user || !user.id || !user.email) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const reservation = await prismadb.reservation.findUnique({
      where: {
        id: params.reservationId,
      }
    });

    const payment = await prismadb.payment.findUnique({
        where: {
            userId_reservationId :{
                userId: user.id,
                reservationId: params.reservationId
            }
        }
    });

    if (payment) {
      return new NextResponse("Already paid", { status: 400 });
    }

    if (!reservation) {
      return new NextResponse("Not found", { status: 404 });
    }

    const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [
      {
        quantity: 1,
        price_data: {
          currency: "USD",
          product_data: {
            name: reservation.id,
          },
          unit_amount: Math.round(reservation.price! * 100),
        }
      }
    ];

    let stripeCustomer = await prismadb.stripeCustomer.findUnique({
      where: {
        userId: user.id,
      },
      select: {
        stripeCustomerId: true,
      }
    });

    if (!stripeCustomer) {
      const customer = await stripe.customers.create({
        email: user.email,
      });

      stripeCustomer = await prismadb.stripeCustomer.create({
        data: {
          userId: user.id,
          stripeCustomerId: customer.id,
        }
      });
    }

    const session = await stripe.checkout.sessions.create({
      customer: stripeCustomer.stripeCustomerId,
      line_items,
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/visits/?success=1`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/visits/?canceled=1`,
      metadata: {
        reservationId: reservation.id,
        userId: user.id,
      }
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.log("[ReservationId_CHECKOUT]", error);
    return new NextResponse("Internal Error", { status: 500 })
  }
}