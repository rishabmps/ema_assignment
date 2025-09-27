import Link from "next/link";

const solutionLinks = [
  { label: "Buyer & seller value", href: "/#personas" },
  { label: "How it works", href: "/#how" },
  { label: "Proof points", href: "/#proof" },
];

const resourceLinks = [
  { label: "Demo studio", href: "/demo" },
  { label: "Product session", href: "mailto:hello@agenticte.com?subject=Product%20session" },
  { label: "Security brief", href: "mailto:hello@agenticte.com?subject=Security%20overview" },
];

const companyLinks = [
  { label: "Talk to us", href: "/#cta" },
  { label: "Careers", href: "mailto:hello@agenticte.com?subject=Careers" },
  { label: "Investor relations", href: "mailto:hello@agenticte.com?subject=Investor%20briefing%20kit" },
];

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-slate-950 text-slate-300">
      <div className="mx-auto grid w-full max-w-6xl gap-12 px-6 py-16 md:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-5">
          <Link href="/" className="flex items-center gap-3 text-white">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 text-lg font-semibold text-white shadow-lg">
              AT
            </span>
            <span className="text-lg font-semibold">Agentic T&E</span>
          </Link>
          <p className="max-w-md text-sm text-slate-400">
            Agentic copilots align finance buyers and travel sellers with shared visibility, automated controls, and happier travelers.
          </p>
          <div className="flex flex-wrap items-center gap-2 text-[11px] font-semibold uppercase tracking-wide text-slate-400">
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">SOC 2 Type II</span>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">ISO 27001</span>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">GDPR Ready</span>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">24/7 Global Support</span>
          </div>
        </div>
        <div className="grid gap-10 sm:grid-cols-3">
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-400">Product</h3>
            <ul className="mt-4 space-y-3 text-sm">
              {solutionLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="transition-colors hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-400">Resources</h3>
            <ul className="mt-4 space-y-3 text-sm">
              {resourceLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="transition-colors hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-400">Company</h3>
            <ul className="mt-4 space-y-3 text-sm">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="transition-colors hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 bg-slate-950/80">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-6 py-8 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <div>© {year} Agentic T&E. All rights reserved.</div>
          <div className="flex flex-wrap items-center gap-5">
            <Link href="/privacy" className="transition-colors hover:text-white">
              Privacy
            </Link>
            <Link href="/terms" className="transition-colors hover:text-white">
              Terms
            </Link>
            <Link href="mailto:hello@agenticte.com" className="transition-colors hover:text-white">
              hello@agenticte.com
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default SiteFooter;
