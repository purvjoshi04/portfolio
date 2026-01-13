import { spaceGrotesk, inter } from "@/lib/fonts";
import "./globals.css";

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