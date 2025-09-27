"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { ArrowRight, Menu, Sparkles } from "lucide-react";

const navItems = [
  { label: "Personas", href: "/#personas" },
  { label: "How it works", href: "/#how" },
  { label: "Proof", href: "/#proof" },
  { label: "Talk to us", href: "/#cta" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/80 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-6 py-4 text-slate-200">
        <Link href="/" className="flex items-center gap-2 font-semibold text-white">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 text-white shadow-lg">
            AT
          </span>
          <span className="text-lg">Agentic T&E</span>
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-medium text-slate-400 md:flex">
          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.href.startsWith("/#") && pathname === "/");
            return (
              <Link
                key={item.label}
                href={item.href}
                className={cn(
                  "transition-colors hover:text-white",
                  isActive ? "text-white" : "text-slate-400"
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Button
            asChild
            className="group bg-white text-slate-900 hover:bg-slate-200"
          >
            <Link href="/demo" className="flex items-center gap-2">
              Launch demo studio
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>

        <div className="flex items-center md:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-white">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Open navigation</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px] overflow-y-auto">
              <div className="flex items-center gap-2 text-base font-semibold text-slate-900">
                <Sparkles className="h-5 w-5 text-blue-600" />
                Agentic T&E
              </div>
              <ul className="mt-6 space-y-4 text-sm font-medium text-slate-700">
                {navItems.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="flex items-center justify-between rounded-xl border border-slate-200/80 bg-slate-50/80 px-4 py-3"
                      onClick={() => setOpen(false)}
                    >
                      <span>{item.label}</span>
                      <ArrowRight className="h-4 w-4 text-slate-400" />
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="mt-8 space-y-3">
                <Button className="w-full bg-white text-slate-900 hover:bg-slate-200" asChild>
                  <Link href="/demo" onClick={() => setOpen(false)}>
                    Launch demo studio
                  </Link>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

export default SiteHeader;
