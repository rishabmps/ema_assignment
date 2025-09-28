# Agentic T&E - Travel & Expense Platform

## Overview
A high-fidelity AI-powered Travel & Expense (T&E) platform prototype demonstrating an "agentic" architecture. The application showcases intelligent AI agents working in the background to automate, streamline, and optimize the entire T&E lifecycle through two key personas: a Traveler (Sarah) and a Finance Operations Manager (Alex).

## Project State
- **Status**: Successfully imported and configured for Replit environment
- **Last Updated**: September 28, 2025
- **Environment**: Development ready, production deployment configured

## Current Architecture
- **Framework**: Next.js 15.3.3 with App Router and Turbopack
- **Language**: TypeScript
- **UI Framework**: React with ShadCN UI components and Tailwind CSS
- **Animation**: Framer Motion
- **AI Backend**: Google AI (Genkit) integration for agent flows
- **Development Server**: Running on port 5000 with host 0.0.0.0

## Recent Changes
- Configured for Replit environment with proper host and port settings
- Set up frontend workflow for development server
- Configured Next.js to allow cross-origin requests for Replit proxy
- Verified all pages load correctly (main landing page and demo studio)
- Dependencies successfully installed and TypeScript errors resolved

## Key Features
- **Invisible Expense Reports**: Automated expense reporting for travelers
- **Intelligent Travel Booking**: Conversational AI-guided booking process
- **Strategic Finance Dashboard**: Finance team command center with exception management
- **AI Agent Workflows**: 8 different AI agents for various T&E tasks
- **Live Demo Environment**: Interactive demo with persona selection

## Project Structure
```
src/
├── app/                 # Next.js App Router pages
├── ai/                  # Genkit AI agent definitions
├── components/          # React components
│   ├── features/        # Feature-specific components
│   ├── ui/              # ShadCN UI components
│   └── views/           # High-level page views
├── lib/                 # Utilities and mock data
└── types/               # TypeScript definitions
```

## User Preferences
- Modern dark theme design
- Component-based architecture with ShadCN UI
- TypeScript for type safety
- AI-powered features with real demonstrations

## Development Workflow
- **Frontend Server**: `npm run dev` (configured for port 5000)
- **AI Development**: `npm run genkit:dev` for AI agent development
- **Build**: `npm run build` for production builds
- **Deployment Target**: Autoscale (stateless web application)

## Notes
- Application successfully renders in Replit environment
- Minor WebSocket warnings for hot module reloading (expected in Replit)
- Cross-origin asset loading configured for Replit proxy
- All core functionality verified working