"use client";
import Container from "../Container/Container";
import Logo from "../Logo/Logo";
import Search from "./Search";
import UserMenu from "./UserMenu";
import { motion } from "framer-motion";

const Navbar = () => {
  return (
    <motion.div
      initial={{ y: -70 }}
      animate={{ y: 0 }}
      transition={{
        type: "spring",
        stiffness: 100,
        ease: "easeIn",
      }}
      className="fixed w-full bg-white z-10 shadow-sm"
    >
      <div className="py-4 border-b-[1px]">
        <Container>
          <div className="flex flex-row items-center justify-between gap-3 md:gap-0">
            <Logo />
            <Search />
            <UserMenu />
          </div>
        </Container>
      </div>
    </motion.div>
  );
};

export default Navbar;
