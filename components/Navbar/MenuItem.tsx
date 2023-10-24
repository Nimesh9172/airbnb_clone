"use client";
import { motion, Variants } from "framer-motion";

interface MenuItemProps {
  onClick: () => void;
  label: string;
}

const itemVariants: Variants = {
  open: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 24 },
  },
  closed: { opacity: 0, y: 20, transition: { duration: 0.2 } },
};

const MenuItem: React.FC<MenuItemProps> = ({ onClick, label }) => {
  return (
    <motion.div
      variants={itemVariants}
      onClick={onClick}
      className="px-4 py-3 hover:bg-neutral-100 font-semibold"
    >
      {label}
    </motion.div>
  );
};

export default MenuItem;
