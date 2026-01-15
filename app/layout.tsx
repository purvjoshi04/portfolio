import { spaceGrotesk, inter } from "@/app/lib/fonts";
import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Purv Joshi",
  description: "Purv joshi portfolio"
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable} antialiased`}>
      <body
        className="font-body"
      >
        {children}
      </body>
    </html>
  );
}