import type { Metadata } from "next";
import { Quicksand } from "next/font/google";
import "./globals.css";

const sandSans = Quicksand({
  variable: "--font-quicksand-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "WeCheck",
  description: "Simply Weather Checker",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${sandSans.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
