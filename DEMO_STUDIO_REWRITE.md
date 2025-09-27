# Demo Studio – Live Experience

## Navigation
- Home
- Demo Studio (current)
- Try Live[Rep]

---

## Welcome to the Agentic T&E Demo Studio

Leave the marketing behind—step into the product. Experience how real AI agents orchestrate and automate travel and expense management in the shoes of **Sarah** (a busy traveler) and **Alex** (a finance operations lead).

Choose your journey, trigger actions, and watch agents work in real-time—no slides, just software.

---

## Choose a Persona

### 👩‍💼 Sarah – Traveler

#### Act I: The Receipt Rush  
Sarah lands after a trip, her phone full of receipts.  
*Trigger the Receipt Concierge by snapping a stack of receipts. Watch as it extracts totals, matches to card transactions, and only pings Sarah if something looks off.*  
- **Metrics:** Time to reimbursement: 35 seconds. Policy confidence: 99.2%.

#### Act II: The Smart Booking  
A new project awaits. Sarah opens the booking panel.  
*Co-create an itinerary with the agent. See how it weighs CO₂ impact, preferences, rates, and duty of care before surfacing options.*  
- **Metrics:** CO₂ reduction: 42%. Negotiated savings: $1,280.

---

### 🧑‍💼 Alex – Finance Ops

#### Act I: Exception Handling  
Alex reviews the dashboard as exception queues update in real time.  
*See how the Policy Engine and Fraud Sentinel prioritize exceptions by AI scoring and urgency. Policy playbooks trigger automated approvals, with Alex in-the-loop for high-risk cases.*  
- **Metrics:** Exceptions automated: 92%.

#### Act II: VAT Reclaim  
Alex heads to the VAT Reclaim tab for end-of-quarter close.  
*The agents automatically surface reclaimable VAT from transactions worldwide. Alex exports detailed reports to maximize tax recovery, with compliance and audit logs generated in the background.*  
- **Metrics:** VAT reclaim coverage: 100%. Average reclaim per quarter: $4,060.

#### Act III: Policy Insights & Improvement  
Alex consults the Policy Insights panel.  
*The Policy Engine analyzes spending patterns, surfacing real recommendations for improving policy effectiveness. Alex reviews new suggestions (like raising thresholds or adjusting per diem rates) and can accept or reject each with one click. Changes are versioned, and their impact is simulated across recent expense history.*  
- **Metrics:** 1+ new policy recommendations per review. Policy drift monitored across all departments.

#### Act IV: Sustainability Monitoring  
Alex checks the Sustainability Dashboard.  
*Monitor CO₂ emissions across bookings, surface climate-friendly alternatives, and generate compliance reports at a click. Real-time alerts nudge travelers and finance to optimize for both budget and climate.*  
- **Metrics:** CO₂ tracking coverage: 100%. Top climate actions surfaced for each quarter.

---

## How to Explore the Demo

1. **Pick a persona** – Start as Sarah or Alex.
2. **Trigger actions** – Upload receipts, book travel, process expenses, review exceptions, reclaim VAT, improve policies, or explore dashboards.
3. **Inspect reasoning** – See agent notes, policy citations, and decision logic for every action.

---

## Try it Live

> **Jump to live demo**  
> [Start Demo](#demo)  
> *(Or select a persona above)*

---

**Every interaction here is powered by the same AI that runs in production. No mockups—just real agent workflows.**

---

*Implementation reference:*  
- Persona/act logic and narrative: `src/components/views/main-dashboard.tsx` (see scenarioDetails and finance sections).
- VAT Reclaim: `src/components/features/finance/vat-reclaim-view.tsx` and `src/components/features/agent-activity/demo-agent-context.tsx`.
- Policy Insights & Improvement: `src/components/features/finance/policy-insight-view.tsx` and related agent activity in `demo-agent-context.tsx`.
- Navigation bar and CTA: `src/app/demo/page.tsx` (`<Button>`, `<Link>`).
- Metrics, highlights, and live agent feed: From agent context in `src/components/features/agent-activity/demo-agent-context.tsx`.