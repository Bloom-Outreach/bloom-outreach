"use client";

import { Send } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export function ContactForm() {
  return (
    <Card className="shadow-lg shadow-primary/5">
      <h3 className="font-heading text-xl font-semibold md:text-2xl">
        Send a Message
      </h3>
      <p className="mt-2 text-sm text-muted-foreground">
        We typically respond within 1–2 business days.
      </p>
      <form className="mt-8 space-y-5" onSubmit={(e) => e.preventDefault()}>
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="firstName" className="mb-2 block text-sm font-medium">
              First Name
            </label>
            <Input id="firstName" name="firstName" className="h-11 rounded-xl" required />
          </div>
          <div>
            <label htmlFor="lastName" className="mb-2 block text-sm font-medium">
              Last Name
            </label>
            <Input id="lastName" name="lastName" className="h-11 rounded-xl" required />
          </div>
        </div>
        <div>
          <label htmlFor="email" className="mb-2 block text-sm font-medium">
            Email
          </label>
          <Input id="email" name="email" type="email" className="h-11 rounded-xl" required />
        </div>
        <div>
          <label htmlFor="subject" className="mb-2 block text-sm font-medium">
            Subject
          </label>
          <Input id="subject" name="subject" className="h-11 rounded-xl" required />
        </div>
        <div>
          <label htmlFor="message" className="mb-2 block text-sm font-medium">
            Message
          </label>
          <Textarea id="message" name="message" className="min-h-[140px] rounded-xl" required />
        </div>
        <Button type="submit" size="lg" className="rounded-full px-7">
          Send Message
          <Send className="size-4" />
        </Button>
      </form>
    </Card>
  );
}
