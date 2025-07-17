import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Handcrafted Haven",
  description: "A marketplace for handcrafted artisan goods",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
