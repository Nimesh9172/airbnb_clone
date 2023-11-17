"use-client";
import { FaSearch } from "react-icons/fa";
import { motion } from "framer-motion";
import useSearchModal from "@/hooks/useSearchModal";
import { useSearchParams } from "next/navigation";
import useCountries from "@/hooks/useCountries";
import { useMemo } from "react";
import { differenceInDays } from "date-fns";

const Search = () => {
  const searchModal = useSearchModal();
  const params = useSearchParams();
  const { getCountryByValue } = useCountries();

  const locationValue = params?.get("locationValue");
  const startDate = params?.get("startDate");
  const endDate = params?.get("endDate");
  const guestCount = params?.get("guestCount");

  const locationLabel = useMemo(() => {
    if (locationValue) {
      return getCountryByValue(locationValue as string)?.label;
    }

    return "Anywhere";
  }, [locationValue, getCountryByValue]);

  const durationLabel = useMemo(() => {
    if (startDate && endDate) {
      const start = new Date(startDate as string);
      const end = new Date(endDate as string);
      let diff = differenceInDays(end, start);

      if (diff == 0) {
        diff = 1;
      }

      return `${diff} Days`;
    }
    return "Any week";
  }, [startDate, endDate]);

  const guestLabel = useMemo(() => {
    if (guestCount) {
      return `${guestCount} Guests`;
    }
    return "Add Guests";
  }, [guestCount]);

  return (
    <motion.div
      onClick={searchModal.onOpen}
      initial={{ scale: 0.5 }}
      animate={{ scale: 1 }}
      whileTap={{ scale: 0.9 }}
      className="border-[1px] w-full md:w-auto py-2 rounded-full shadow-sm hover:shadow-md  cursor-pointer"
    >
      <div className="flex flex-row items-center justify-between">
        <div className="text-sm font-semibold sm:px-6 pl-4">
          {locationLabel}
        </div>
        <div className="hidden sm:block text-sm font-semibold px-6 border-x-[1px]">
          {durationLabel}
        </div>
        <div className="text-sm pl-6 pr-2 text-gray-600 flex flex-row items-center gap-3">
          <div className="hidden sm:block">{guestLabel}</div>
          <div className="p-2 bg-rose-500 rounded-full text-white">
            <FaSearch size={10} />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Search;
