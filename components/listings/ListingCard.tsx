"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  SafePurchase,
  safeListing,
  safeReservation2,
  safeUser,
} from "@/types/types";
import { ADMIN_ID } from "@/permissions";
import { Button } from "../ui/button";
import { useCallback, useMemo } from "react";
import { format } from "date-fns";
import { Card } from "../ui/card";
import { ArrowRight, Check } from "lucide-react";

interface ListingCardProps {
  data: safeListing;
  currentUser?: safeUser | null;
  reservation?: safeReservation2;
  onAction?: (id: string) => void;
  onPay?: (id: string) => void;
  disabled?: boolean;
  actionLabel?: string;
  actionId?: string;
  admin?: boolean;
  purchase?: SafePurchase[] | null;
}

const ListingCard = ({
  data,
  currentUser,
  reservation,
  onAction,
  disabled,
  actionLabel,
  actionId = "",
  admin,
  onPay,
  purchase,
}: ListingCardProps) => {
  const router = useRouter();

  const handleCancel = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      //overwrite the onclick on parent div element
      e.stopPropagation();

      if (disabled) {
        return;
      }
      onAction?.(actionId);
    },
    [disabled, onAction, actionId]
  );

  const ReservatoionDate = useMemo(() => {
    if (!reservation) {
      return null;
    }

    const date = new Date(reservation.date);

    return `${format(date, "HH:mm PP")}`;
  }, [reservation]);

  const payNow = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onPay?.(actionId);
  };

  const isPurchased = (purchase: any) => {
    return purchase && purchase.length === 0;
  };

  return (
    <div
      onClick={() => router.push(`/listings/${data.id}`)}
      className="col-span-1 cursor-pointer transition"
    >
      <Card className="flex flex-col gap-2 w-full rounded-b-lg pb-2 group">
        <div className="aspect-video w-full relative overflow-hidden rounded-t-lg">
          <Image
            src={data.imageSrc}
            alt="Image url"
            fill
            className="object-cover h-full w-full hover:scale-125 transition ease-in duration-500"
          />
        </div>
        <div className="px-3">
          <div className="text-xl font-semibold">{data.title}</div>
          <div className="text-sm">{data.category}</div>
          <div className="flex items-center justify-between gap-1">
            <div className="font-semibold">$ {data.price}</div>
            <div className="flex justify-end group-hover:rotate-90 transition duration-300">
              <ArrowRight size={24} />
            </div>
          </div>

          {onAction && actionLabel && (
            <div className="text-center">
              <p className="text-lg pb-1 text-start">{ReservatoionDate}</p>
              {admin && (
                <div className="text-lg pb-2 text-muted-foreground text-start">
                  <p>ClientName</p>
                  <span className="text-xl capitalize  text-black ">
                    {reservation?.userName}
                  </span>
                </div>
              )}
              {currentUser?.id === ADMIN_ID ? (
                <div className="flex flex-col">
                  {isPurchased(purchase) ? (
                    <Button
                      variant="cancel"
                      disabled={disabled}
                      onClick={handleCancel}
                    >
                      {actionLabel}
                    </Button>
                  ) : (
                    <div className="flex items-center justify-center space-x-3 pt-1">
                      <p className="text-sm text-muted-foreground py-2 font-semibold  text-center items-center">
                        Already Paid by{" "}
                        <span className=" text-black">
                          {reservation?.userName}{" "}
                        </span>
                      </p>
                      <Check />
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex flex-col space-y-2">
                  {isPurchased(purchase) ? (
                    <div className="flex flex-col">
                      <Button
                        variant="cancel"
                        disabled={disabled}
                        onClick={handleCancel}
                      >
                        {actionLabel}
                      </Button>

                      <Button
                        data-testid="pay-now"
                        variant="default"
                        disabled={disabled}
                        onClick={payNow}
                      >
                        Pay now
                      </Button>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center space-x-3 pt-1">
                      <p className="text-lg font-semibold py-6 text-center items-center">
                        Already Paid
                      </p>
                      <Check />
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default ListingCard;
