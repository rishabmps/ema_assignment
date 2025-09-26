# Agentic T&E: A Next-Generation Travel & Expense Platform Demo

This project is a high-fidelity prototype of a revolutionary, AI-powered Travel & Expense (T&E) platform. It's designed to demonstrate the power of an "agentic" architecture, where intelligent AI agents work in the background to automate, streamline, and optimize the entire T&E lifecycle.

The demo tells a story through two key personas: a **Traveler** (Sarah) and a **Finance Operations Manager** (Alex), showcasing how the platform transforms their respective experiences.

## Core Concepts

- **Invisible Expense Reports**: For the traveler, the chore of filing an expense report is eliminated. The system automates everything from receipt capture to policy checking.
- **Intelligent & Guided Travel**: The booking process becomes a simple conversation, with AI agents proactively guiding users toward policy-compliant, cost-effective, and sustainable options.
- **Strategic Finance Command Center**: For the finance team, the dashboard is transformed from a reactive queue into a strategic hub for managing exceptions, uncovering financial insights (like VAT reclaim), and evolving company policy based on data.

## Tech Stack

- **Framework**: Next.js (App Router)
- **Language**: TypeScript
- **UI**: React, ShadCN UI, Tailwind CSS
- **Animation**: Framer Motion
- **AI/Backend (Simulated)**: Genkit (for defining agent flows)

---

## Running the Demo Locally

To get started with this project, follow these steps:

1.  **Install Dependencies**:
    ```bash
    npm install
    ```

2.  **Run the Development Server**:
    ```bash
    npm run dev
    ```

    The application will be available at [http://localhost:9002](http://localhost:9002).

---

## Project Structure

This project follows a feature-centric architecture to ensure scalability and maintainability.

```
/
├── src/
│   ├── app/                # Next.js App Router (routing, pages, layouts)
│   ├── ai/                 # Genkit AI agent and flow definitions
│   ├── components/
│   │   ├── common/         # Shared, reusable components (e.g., StatusTag)
│   │   ├── features/       # Components specific to a feature or persona
│   │   │   ├── finance/    # Components for the Finance Ops dashboard
│   │   │   └── traveler/   # Components for the Traveler mobile experience
│   │   ├── ui/             # Core UI components (from ShadCN)
│   │   └── views/          # High-level view components that compose pages
│   ├── data/               # Hardcoded JSON data simulating a backend
│   ├── hooks/              # Custom React hooks (e.g., use-toast)
│   ├── lib/                # Libraries and utility functions
│   └── types/              # TypeScript type definitions
├── tailwind.config.ts    # Tailwind CSS configuration
└── next.config.ts        # Next.js configuration
```
