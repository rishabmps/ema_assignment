export const metadata = {
  title: "Terms • Agentic T&E",
  description: "Review the service terms governing the Agentic T&E platform.",
};

export default function TermsPage() {
  return (
    <main className="mx-auto w-full max-w-4xl px-6 py-16">
      <div className="space-y-6">
        <h1 className="text-4xl font-semibold text-slate-900">Terms of Service</h1>
        <p className="text-lg text-slate-600">
          These terms outline how Agentic T&E delivers, supports, and secures the platform for your organization. They work in tandem with your master service agreement and data processing addendum.
        </p>
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-slate-900">Core Principles</h2>
          <ul className="list-disc space-y-2 pl-6 text-slate-600">
            <li>Uptime commitment of 99.9% backed by service credits</li>
            <li>Transparent AI governance with human oversight controls</li>
            <li>Continuous compliance monitoring and vulnerability management</li>
          </ul>
        </section>
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-slate-900">Need the full agreement?</h2>
          <p className="text-slate-600">
            Work with your account team to review the full contractual package, or email <a href="mailto:legal@agenticte.com" className="text-blue-600 underline">legal@agenticte.com</a> for assistance.
          </p>
        </section>
      </div>
    </main>
  );
}
