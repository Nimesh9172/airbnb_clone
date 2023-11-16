import "./globals.css";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar/Navbar";
import { Nunito } from "next/font/google";

import RegisterModal from "@/components/Modals/RegisterModal";
import LoginModal from "@/components/Modals/LoginModal";
import RentModal from "@/components/Modals/RentModal";

import ToasterProvider from "@/providers/ToasterProvider";
import getCurrentUser from "./actions/getCurrentUser";
import SearchModal from "@/components/Modals/SearchModal";

export const metadata: Metadata = {
  title: "Airbnb",
  description: "Holiday Homes & Apartment Rentals",
};

const font = Nunito({
  subsets: ["latin"],
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();

  return (
    <html lang="en">
      <body className={font.className}>
        {/* <Modal isOpen title="My Modal" actionLabel="Submit" /> */}
        <ToasterProvider />
        <SearchModal />
        <RentModal />
        <RegisterModal />
        <LoginModal />
        <Navbar currentUser={currentUser} />
        <div className="pb-20 pt-28">{children}</div>
      </body>
    </html>
  );
}
