import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext"; // Your own context
import { SessionProvider } from "next-auth/react";
import { Providers } from "@/context/Provider";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dev Mentor",
  description: "Dev Mentor is a plateform where users can come play with codes and learn to evauluate there coding experience.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${geistMono.className} antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
