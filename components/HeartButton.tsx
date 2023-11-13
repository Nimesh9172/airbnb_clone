"use client";

import useFavorite from "@/hooks/useFavorite";
import { SafeUser } from "@/types";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

interface HeartButtonProps {
  listingId: string;
  currentUser?: SafeUser | null;
}

const HeartButton: React.FC<HeartButtonProps> = ({
  listingId,
  currentUser,
}) => {
  const { hasFavorited, toggleFavorite, isLoading } = useFavorite({
    listingId,
    currentUser,
  });

  const favoriteClickHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (!isLoading) {
      toggleFavorite();
    }
  };

  return (
    <div
      onClick={favoriteClickHandler}
      className="relative hover:opacity-80 transition cursor-pointer"
    >
      <AiOutlineHeart
        size={26}
        className="fill-white absolute z-10 -top-[2px] -right-[2px]"
      />
      <AiFillHeart
        size={24}
        className={`${
          hasFavorited ? "fill-rose-500" : "fill-neutral-500/70"
        } absolute  -top-[2px] -right-[2px] `}
      />
    </div>
  );
};

export default HeartButton;
