import type { Metadata } from "next";
import { NotFoundContent } from "@/components/not-found-content";

export const metadata: Metadata = {
  title: "Page Not Found",
  description:
    "This page could not be found. Return to Bloom Outreach to volunteer, serve, and spread the word.",
};

export default function NotFound() {
  return <NotFoundContent />;
}
