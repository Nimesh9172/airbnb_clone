"use client";

import { useRouter } from "next/navigation";

import { useState, useCallback } from "react";

import useHttp from "@/hooks/useHttp";

import Container from "@/components/Container/Container";
import Heading from "@/components/Heading";
import { SafeListing, SafeUser } from "@/types";
import { Listing, Reservation } from "@prisma/client";
import toast from "react-hot-toast";
import ListingCard from "@/components/Listing/ListingCard";

interface PropertiesClientProps {
  listings: SafeListing[];
  currentUser?: SafeUser | null;
}

const PropertiesClient: React.FC<PropertiesClientProps> = ({
  listings,
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
          url: `api/listings/${id}`,
        },
        (data) => {
          toast.success("Property deleted");
          setDeletingId("");
          router.refresh();
        }
      );

      if (error) {
        setDeletingId("");
      }
    },
    [deletingId]
  );

  return (
    <Container>
      <Heading title="Properties" subtitle="List of your properties" />
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {listings.map((listing: any) => (
          <ListingCard
            key={listing.id}
            data={listing}
            actionId={listing.id}
            onAction={onCancel}
            disabled={deletingId === listing.id}
            actionLabel="Delete property"
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  );
};

export default PropertiesClient;
