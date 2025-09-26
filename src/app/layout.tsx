import type { Metadata } from "next";
// import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import "./globals.css";

// const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Agentic T&E",
  description: "The Agentic Travel & Expense Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-body antialiased font-inter" suppressHydrationWarning>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
