import type { Metadata, Viewport } from "next";
import "./globals.css";
import { personalInfo } from "@/lib/data";

export const metadata: Metadata = {
  title: `${personalInfo.name}`,
  description: personalInfo.bio,
  authors: [{ name: personalInfo.name }],
  keywords: ["portfolio", "developer", "full-stack", "TypeScript", "Next.js"],
  openGraph: {
    title: `${personalInfo.name}`,
    description: personalInfo.bio,
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#000000",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body>
        <div className="grain" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
