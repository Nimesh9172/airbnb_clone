"use client";
import { SafeReservation, SafeUser } from "@/types";
import { Reservation } from "@prisma/client";
import useHttp from "@/hooks/useHttp";

import toast from "react-hot-toast";
import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";

import Heading from "@/components/Heading";
import Container from "@/components/Container/Container";
import ListingCard from "@/components/Listing/ListingCard";

interface ReservationsClientProps {
  reservations: Reservation[];
  currentUser: SafeUser | null;
}

const ReservationsClient: React.FC<ReservationsClientProps> = ({
  reservations,
  currentUser,
}) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState("");

  const { isLoading, error, sendRequest } = useHttp();

  const onCancel = useCallback(
    (id: string) => {
      setDeletingId(id);

      sendRequest(
        {
          url: `/api/reservation/${id}`,
          method: "DELETE",
        },
        (data) => {
          toast.success("Reservation cancelled");
          router.refresh();
          setDeletingId("");
        }
      );
      if (error) {
        setDeletingId("");
      }
    },
    [router]
  );

  return (
    <Container>
      <Heading title="Reservations" subtitle="Booking on your properties" />
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {reservations.map((reservation: any) => (
          <ListingCard
            key={reservation.id}
            data={reservation.listing}
            reservation={reservation}
            actionId={reservation.id}
            onAction={onCancel}
            disabled={deletingId === reservation.id}
            actionLabel="Cancel guest reservation"
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  );
};

export default ReservationsClient;
