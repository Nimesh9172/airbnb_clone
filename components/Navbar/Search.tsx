"use-client";
import { FaSearch } from "react-icons/fa";
import { motion } from "framer-motion";

const Search = () => {
  return (
    <motion.div
      initial={{ scale: 0.5 }}
      animate={{ scale: 1 }}
      className="border-[1px] w-full md:w-auto py-2 rounded-full shadow-sm hover:shadow-md transition cursor-pointer"
    >
      <div className="flex flex-row items-center justify-between">
        <div className="text-sm font-semibold sm:px-6 pl-4">Any Where</div>
        <div className="hidden sm:block text-sm font-semibold px-6 border-x-[1px]">
          Any Week
        </div>
        <div className="text-sm pl-6 pr-2 text-gray-600 flex flex-row items-center gap-3">
          <div className="hidden sm:block">Add Guests</div>
          <div className="p-2 bg-rose-500 rounded-full text-white">
            <FaSearch size={10} />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Search;
