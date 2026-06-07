"use client";

import { useState } from "react";
import {
  Bell,
  Lock,
  LogOut,
  Mail,
  Phone,
  Save,
  Shield,
  User,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  mockVolunteer,
  volunteerFocusOptions,
  type VolunteerRole,
} from "@/lib/mock-volunteer";
import { cn } from "@/lib/utils";

function Toggle({
  enabled,
  onChange,
  label,
  description,
}: {
  enabled: boolean;
  onChange: (value: boolean) => void;
  label: string;
  description?: string;
}) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div>
        <p className="font-medium text-foreground">{label}</p>
        {description && (
          <p className="mt-0.5 text-sm text-muted-foreground">{description}</p>
        )}
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={enabled}
        onClick={() => onChange(!enabled)}
        className={cn(
          "relative inline-flex h-7 w-12 shrink-0 rounded-full transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50",
          enabled ? "bg-primary" : "bg-muted"
        )}
      >
        <span
          className={cn(
            "absolute top-0.5 size-6 rounded-full bg-white shadow-sm transition-transform duration-200",
            enabled ? "translate-x-5" : "translate-x-0.5"
          )}
        />
      </button>
    </div>
  );
}

export function SettingsForm() {
  const v = mockVolunteer;
  const [focus, setFocus] = useState<VolunteerRole>(v.focus);
  const [notifications, setNotifications] = useState<{
    emailEvents: boolean;
    emailReminders: boolean;
    emailNewsletter: boolean;
    smsReminders: boolean;
  }>({
    emailEvents: v.preferences.emailEvents,
    emailReminders: v.preferences.emailReminders,
    emailNewsletter: v.preferences.emailNewsletter,
    smsReminders: v.preferences.smsReminders,
  });

  return (
    <div className="space-y-8">
      <Card>
        <div className="mb-6 flex items-center gap-3">
          <span className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <User className="size-5" />
          </span>
          <div>
            <h3 className="font-heading text-lg font-semibold">
              Personal Information
            </h3>
            <p className="text-sm text-muted-foreground">
              Update your name and contact details.
            </p>
          </div>
        </div>

        <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="firstName" className="mb-2 block text-sm font-medium">
                First Name
              </label>
              <Input
                id="firstName"
                defaultValue={v.firstName}
                className="h-11 rounded-xl"
              />
            </div>
            <div>
              <label htmlFor="lastName" className="mb-2 block text-sm font-medium">
                Last Name
              </label>
              <Input
                id="lastName"
                defaultValue={v.lastName}
                className="h-11 rounded-xl"
              />
            </div>
          </div>
          <div>
            <label htmlFor="email" className="mb-2 block text-sm font-medium">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                defaultValue={v.email}
                className="h-11 rounded-xl pl-10"
              />
            </div>
          </div>
          <div>
            <label htmlFor="phone" className="mb-2 block text-sm font-medium">
              Phone
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="phone"
                type="tel"
                defaultValue={v.phone}
                className="h-11 rounded-xl pl-10"
              />
            </div>
          </div>
          <div>
            <label htmlFor="bio" className="mb-2 block text-sm font-medium">
              Bio
            </label>
            <Textarea
              id="bio"
              defaultValue={v.bio}
              className="min-h-[100px] rounded-xl"
            />
          </div>
        </form>
      </Card>

      <Card>
        <div className="mb-6 flex items-center gap-3">
          <span className="flex size-10 items-center justify-center rounded-xl bg-bloom-green/10 text-bloom-green">
            <Shield className="size-5" />
          </span>
          <div>
            <h3 className="font-heading text-lg font-semibold">
              Volunteer Focus
            </h3>
            <p className="text-sm text-muted-foreground">
              How do you primarily serve with Bloom Outreach?
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {volunteerFocusOptions.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => setFocus(option)}
              className={cn(
                "rounded-full border px-4 py-2 text-sm font-medium transition-all duration-200",
                focus === option
                  ? "border-primary bg-primary text-primary-foreground shadow-md shadow-primary/20"
                  : "border-border bg-background text-muted-foreground hover:border-primary/30 hover:text-foreground"
              )}
            >
              {option}
            </button>
          ))}
        </div>
      </Card>

      <Card>
        <div className="mb-6 flex items-center gap-3">
          <span className="flex size-10 items-center justify-center rounded-xl bg-bloom-gold/12 text-bloom-gold-foreground">
            <Bell className="size-5" />
          </span>
          <div>
            <h3 className="font-heading text-lg font-semibold">Notifications</h3>
            <p className="text-sm text-muted-foreground">
              Choose how you hear from us about events and outreach.
            </p>
          </div>
        </div>

        <div className="divide-y divide-border/60">
          <div className="pb-5">
            <Toggle
              enabled={notifications.emailEvents}
              onChange={(value) =>
                setNotifications((n) => ({ ...n, emailEvents: value }))
              }
              label="Event updates"
              description="New cleanup days, volunteer orientations, and outreach events."
            />
          </div>
          <div className="py-5">
            <Toggle
              enabled={notifications.emailReminders}
              onChange={(value) =>
                setNotifications((n) => ({ ...n, emailReminders: value }))
              }
              label="Event reminders"
              description="Reminders 24 hours before events you've signed up for."
            />
          </div>
          <div className="py-5">
            <Toggle
              enabled={notifications.emailNewsletter}
              onChange={(value) =>
                setNotifications((n) => ({ ...n, emailNewsletter: value }))
              }
              label="Bloom newsletter"
              description="Monthly stories, impact updates, and volunteer highlights."
            />
          </div>
          <div className="pt-5">
            <Toggle
              enabled={notifications.smsReminders}
              onChange={(value) =>
                setNotifications((n) => ({ ...n, smsReminders: value }))
              }
              label="SMS reminders"
              description="Text message reminders for upcoming events."
            />
          </div>
        </div>
      </Card>

      <Card>
        <div className="mb-6 flex items-center gap-3">
          <span className="flex size-10 items-center justify-center rounded-xl bg-muted text-muted-foreground">
            <Lock className="size-5" />
          </span>
          <div>
            <h3 className="font-heading text-lg font-semibold">Account</h3>
            <p className="text-sm text-muted-foreground">
              Manage your password and session.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <Button variant="outline" className="rounded-full">
            Change Password
          </Button>
          <div className="rounded-2xl border border-destructive/20 bg-destructive/5 p-4">
            <p className="text-sm font-medium text-foreground">Sign out</p>
            <p className="mt-1 text-sm text-muted-foreground">
              End your session on this device.
            </p>
            <Button
              variant="outline"
              className="mt-4 rounded-full border-destructive/30 text-destructive hover:bg-destructive/10 hover:text-destructive"
            >
              <LogOut className="size-4" />
              Sign Out
            </Button>
          </div>
        </div>
      </Card>

      <div className="flex justify-end">
        <Button size="lg" className="rounded-full px-8">
          <Save className="size-4" />
          Save Changes
        </Button>
      </div>
    </div>
  );
}
