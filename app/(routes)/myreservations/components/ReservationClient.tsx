"use client";

import Container from "@/components/Container";
import { Heading } from "@/components/Heading";
import { PageWrapper } from "@/components/animations/pageWrapper";
import ListingCard from "@/components/listings/ListingCard";
import { safeReservation2, safeUser } from "@/types/types";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-hot-toast";

interface ReservationClientProps {
  reservations: safeReservation2[];
  currentUser: safeUser;
}

const ReservationClient = ({
  reservations,
  currentUser,
}: ReservationClientProps) => {
  const router = useRouter();
  const [deletedId, setDeletedId] = useState("");

  const onCancel = (id: string) => {
    setDeletedId(id);

    axios
      .delete(`/api/reservation/${id}`)
      .then(() => {
        toast.success("Reservation Cancelled");
        router.refresh();
      })
      .catch(() => {
        toast.error("Error cancelling reservation");
      })
      .finally(() => {
        setDeletedId("");
      });
  };

  return (
    <Container>
      <Heading
        title="Your Reservations"
        desc="All reservations made on your listings, you can cancel them if you want"
      />
      <div
        className="pt-7 pb-5 gap-4 grid grid-cols-1 md:grid-cols-2 
          lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 "
      >
        {reservations.map((reservation: safeReservation2) => (
          <div key={reservation.id}>
            <PageWrapper>
              <div>
                <ListingCard
                  reservation={reservation}
                  data={reservation.listing}
                  actionId={reservation.id}
                  onAction={onCancel}
                  purchase={reservation.purchases}
                  currentUser={currentUser}
                  actionLabel="Remove reservation"
                  admin
                />
              </div>
            </PageWrapper>
          </div>
        ))}
      </div>
    </Container>
  );
};

export default ReservationClient;
