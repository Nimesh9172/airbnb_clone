"use client";

import { useRouter } from "next/navigation";

import { useState, useCallback } from "react";

import useHttp from "@/hooks/useHttp";

import Container from "@/components/Container/Container";
import Heading from "@/components/Heading";
import { SafeUser } from "@/types";
import { Reservation } from "@prisma/client";
import toast from "react-hot-toast";
import ListingCard from "@/components/Listing/ListingCard";

interface TripsClientProps {
  reservations: Reservation[];
  currentUser?: SafeUser | null;
}

const TripsClient: React.FC<TripsClientProps> = ({
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
          method: "DELETE",
          url: `api/reservation/${id}`,
        },
        (data) => {
          toast.success("Reservation cancelled");
          setDeletingId("");
          router.refresh();
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
      <Heading
        title="Trips"
        subtitle="Where you've been and where you're going"
      />
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {reservations.map((reservation: any) => (
          <ListingCard
            key={reservation.id}
            data={reservation.listing}
            reservation={reservation}
            actionId={reservation.id}
            onAction={onCancel}
            disabled={deletingId === reservation.id}
            actionLabel="Cancel reservation"
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  );
};

export default TripsClient;
