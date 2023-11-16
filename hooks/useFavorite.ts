import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";

import { SafeUser } from "@/types";
import toast from "react-hot-toast";
import useLoginModal from "./useLoginModal";
import useHttp from "./useHttp";

interface IUseFavorite {
  listingId: string;
  currentUser?: SafeUser | null;
}

const useFavorite = ({ listingId, currentUser }: IUseFavorite) => {
  const router = useRouter();
  const loginModal = useLoginModal();

  const { error, isLoading, sendRequest } = useHttp();

  const hasFavorited = useMemo(() => {
    const list = currentUser?.favoriteIds || [];
    return list.includes(listingId);
  }, [currentUser, listingId]);

  const toggleFavorite = useCallback(async () => {
    if (!currentUser) {
      return loginModal.onOpen();
    }

    const loadingToastId = toast.loading("Loading...");

    if (hasFavorited) {
      await sendRequest(
        {
          url: `/api/favorites/${listingId}`,
          method: "DELETE",
        },
        (data) => {
          toast.dismiss(loadingToastId);
          toast.success("Removed from favorites");
        }
      );
    } else {
      await sendRequest(
        {
          url: `/api/favorites/${listingId}`,
          method: "POST",
        },
        (data) => {
          toast.dismiss(loadingToastId);
          toast.success("Added to favorites");
        }
      );
    }
    // await request();
    if (!error) {
      router.refresh();
    }
    toast.dismiss(loadingToastId);
  }, [currentUser, hasFavorited, listingId, loginModal, router]);

  return {
    isLoading,
    hasFavorited,
    toggleFavorite,
  };
};

export default useFavorite;
