"use client";

import { Variants, motion } from "framer-motion";

import { IconType } from "react-icons";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import qs from "query-string";

interface CategoryBoxProps {
  icon: IconType;
  label: string;
  selected?: boolean;
}

const itemVariants: Variants = {
  open: {
    opacity: 1,
    x: 0,
    transition: { type: "just" },
  },
  closed: { opacity: 0, x: -20, transition: { duration: 0.1 } },
};

const CategoryBox: React.FC<CategoryBoxProps> = ({
  icon: Icon,
  label,
  selected,
}) => {
  const router = useRouter();
  const params = useSearchParams();

  const queryClickHandler = useCallback(() => {
    let currentQuery = {};

    if (params) {
      currentQuery = qs.parse(params.toString());
    }

    const updatedQuery: any = {
      ...currentQuery,
      category: label,
    };

    if (params?.get("category") === label) {
      delete updatedQuery.category;
    }

    const url = qs.stringifyUrl(
      {
        url: "/",
        query: updatedQuery,
      },
      { skipNull: true }
    );

    router.push(url);
  }, [label, params, router]);

  return (
    <motion.div
      // variants={itemVariants}
      onClick={queryClickHandler}
      whileTap={{ scale: 0.8 }}
      className={`flex flex-col items-center justify-center gap-2 p-3 border-b-2 hover:text-neutral-800 hover:border-b-neutral-300  cursor-pointer 
    ${
      selected
        ? "border-b-neutral-800 hover:border-b-neutral-800 text-neutral-800"
        : "border-transparent text-neutral-500"
    }
    `}
    >
      <Icon size={26} />
      <div className="font-medium text-sm">{label}</div>
    </motion.div>
  );
};

export default CategoryBox;
