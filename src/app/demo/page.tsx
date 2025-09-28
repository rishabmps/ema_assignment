import Link from "next/link";
import { DemoStudioClient } from "@/components/demo-studio-client";

export const metadata = {
  title: "Demo Studio – Live Experience", 
  description:
    "Experience live agent orchestration as Sarah (Traveler) and Alex (Finance Ops) through immersive demo acts. No slides, just software.",
};

export default function DemoPage() {
  return <DemoStudioClient />;
}