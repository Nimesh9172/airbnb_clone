"use client";

import React from "react";
import { HiMenu } from "react-icons/hi";
import Avatar from "../Avatar";
import { useCallback, useState } from "react";
import MenuItem from "./MenuItem";
import { motion, Variants } from "framer-motion";

import useRegisterModal from "@/hooks/useRegisterModal";
import useLoginModal from "@/hooks/useLoginModal";

import { signOut } from "next-auth/react";
import { SafeUser } from "@/types";

interface UserMenuProps {
  currentUser?: SafeUser | null;
}

const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();

  const [isOpen, setIsOpen] = useState(false);

  const boxVariants: Variants = {
    open: {
      clipPath: "inset(-20% -20% -20% -20%)",
      transition: {
        type: "spring",
        bounce: 0,
        duration: 1,
        delayChildren: 0,
        staggerChildren: 0.1,
      },
    },
    closed: {
      clipPath: "inset(0% 0% 100% 0%)",
      transition: {
        type: "spring",
        bounce: 0,
        duration: 0.3,
      },
    },
  };

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  let menuItems = (
    <>
      <MenuItem onClick={loginModal.onOpen} label="Login" />
      <MenuItem onClick={registerModal.onOpen} label="Sign up" />
    </>
  );

  if (currentUser) {
    menuItems = (
      <>
        <MenuItem onClick={() => {}} label="Home" />
        <MenuItem onClick={() => {}} label="My trips" />
        <MenuItem onClick={() => {}} label="My favorites" />
        <MenuItem onClick={() => {}} label="My reservations" />
        <MenuItem onClick={() => {}} label="My properties" />
        <hr />
        <MenuItem onClick={() => signOut()} label="Logout" />
      </>
    );
  }

  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div
          onClick={() => {}}
          className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer"
        >
          Airbnb your home
        </div>
        <motion.div
          whileTap={{ scale: 0.9 }}
          onClick={toggleOpen}
          className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md select-none"
        >
          <HiMenu />
          <div className="hidden md:block">
            <Avatar src={currentUser?.image} />
          </div>
        </motion.div>
      </div>
      {isOpen && (
        <motion.div
          variants={boxVariants}
          initial="closed"
          animate="open"
          className="select-none absolute rounded-xl shadow-lg w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm"
        >
          <div className="flex flex-col cursor-pointer">{menuItems}</div>
        </motion.div>
      )}
    </div>
  );
};

export default UserMenu;
