import type { Metadata } from "next";
import { Toaster } from "@/components/ui/toaster";
import SiteHeader from "@/components/layout/site-header";
import SiteFooter from "@/components/layout/site-footer";
import { ToggleProvider } from "@/components/layout/toggle-context";
import { ToastProvider } from "@/components/ui/toast-context";
import { ToastContainer } from "@/components/ui/toast-container";
import "./globals.css";

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
        <ToastProvider>
          <ToggleProvider>
            <div className="flex min-h-screen flex-col">
              <SiteHeader />
              <div className="flex-1 relative">
                {children}
              </div>
              <SiteFooter />
            </div>
          </ToggleProvider>
        </ToastProvider>
        <Toaster />
      </body>
    </html>
  );
}
