export const metadata = {
  title: "Privacy • Agentic T&E",
  description: "Learn how Agentic T&E handles data privacy, security, and governance across the platform.",
};

export default function PrivacyPage() {
  return (
    <main className="mx-auto w-full max-w-4xl px-6 py-16">
      <div className="space-y-6">
        <h1 className="text-4xl font-semibold text-slate-900">Privacy Commitment</h1>
        <p className="text-lg text-slate-600">
          Agentic T&E is engineered with a privacy-first architecture. We minimize data collection, encrypt information in transit and at rest, and provide granular controls so your organization can meet regional regulations without friction.
        </p>
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-slate-900">Data Governance</h2>
          <p className="text-slate-600">
            • Dedicated data residency options in the US and EU
            <br />• Role-based access with policy-driven redaction
            <br />• Customer-managed retention schedules and deletion workflows
          </p>
        </section>
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-slate-900">Your Controls</h2>
          <p className="text-slate-600">
            We provide data processing agreements, audit artifacts, and configurable policies for user access, export, and deletion. For detailed documentation or to submit a privacy request, email <a href="mailto:privacy@agenticte.com" className="text-blue-600 underline">privacy@agenticte.com</a>.
          </p>
        </section>
      </div>
    </main>
  );
}
