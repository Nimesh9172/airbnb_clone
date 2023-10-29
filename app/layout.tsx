import "./globals.css";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar/Navbar";
import { Nunito } from "next/font/google";
import Modal from "@/components/Modals/Modal";

export const metadata: Metadata = {
  title: "Airbnb",
  description: "Holiday Homes & Apartment Rentals",
};

const font = Nunito({
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        <Modal isOpen title="My Modal" actionLabel="Submit" />
        <Navbar />
        {children}
      </body>
    </html>
  );
}
