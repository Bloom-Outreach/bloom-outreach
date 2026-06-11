"use client";

import { useMemo, useState } from "react";
import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Clock,
  MapPin,
} from "lucide-react";
import { BloomLogoIcon } from "@/components/bloom-logo-icon";
import { EventVolunteerSignup } from "@/components/events/event-volunteer-signup";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MapEmbed } from "@/components/ui/map-embed";
import { upcomingEvents, type UpcomingEvent } from "@/lib/constants";
import {
  formatEventDate,
  formatMonthYear,
  getSaturdayCalendarDays,
  isSameDay,
  isSaturday,
  parseEventDate,
} from "@/lib/date-utils";
import { volunteerScheduleConfig } from "@/lib/mock-dashboard";
import { cn } from "@/lib/utils";

const WEEKDAYS = ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"] as const;

function dateKey(date: Date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

function EventCard({ event, isNext }: { event: UpcomingEvent; isNext?: boolean }) {
  return (
    <Card
      className={cn(
        "relative flex flex-col gap-4 overflow-hidden",
        isNext && "border-primary/30 ring-1 ring-primary/15",
      )}
    >
      {isNext && (
        <span
          className="absolute right-0 top-0 flex size-8 items-center justify-center rounded-bl-xl border-l border-b border-primary/25 bg-primary/10"
          aria-label="Next volunteering Saturday"
        >
          <BloomLogoIcon className="size-5 text-sm" />
        </span>
      )}

      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <span className="inline-block rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
            Volunteering
          </span>
          <h3 className="mt-2 font-heading text-xl font-semibold">
            {event.title}
          </h3>
          {isNext && (
            <p className="mt-1 text-xs font-medium text-primary">
              Next volunteering Saturday
            </p>
          )}
        </div>
        <div className="rounded-xl bg-muted px-3 py-2 text-center">
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            {parseEventDate(event.date).toLocaleDateString("en-US", {
              month: "short",
            })}
          </p>
          <p className="font-heading text-2xl font-semibold leading-none text-primary">
            {parseEventDate(event.date).getDate()}
          </p>
        </div>
      </div>

      <p className="text-sm leading-relaxed text-muted-foreground">
        {event.description}
      </p>

      <ul className="space-y-2 text-sm text-muted-foreground">
        <li className="flex items-start gap-2">
          <CalendarDays className="mt-0.5 size-4 shrink-0 text-primary" />
          {formatEventDate(event.date)}
        </li>
        <li className="flex items-start gap-2">
          <Clock className="mt-0.5 size-4 shrink-0 text-primary" />
          {event.startTime} – {event.endTime}
        </li>
        <li className="flex items-start gap-2">
          <MapPin className="mt-0.5 size-4 shrink-0 text-primary" />
          {event.location}
        </li>
      </ul>

      <MapEmbed location={event.location} className="h-44" />

      <EventVolunteerSignup event={event} />
    </Card>
  );
}

export function EventsCalendar() {
  const today = useMemo(() => new Date(), []);
  const nextVolunteeringDate = parseEventDate(volunteerScheduleConfig.nextEventDate);

  const [viewDate, setViewDate] = useState(
    () => new Date(nextVolunteeringDate.getFullYear(), nextVolunteeringDate.getMonth(), 1),
  );
  const [selectedDate, setSelectedDate] = useState<Date | null>(nextVolunteeringDate);

  const eventsByDate = useMemo(() => {
    const map = new Map<string, UpcomingEvent[]>();
    for (const event of upcomingEvents) {
      const key = event.date;
      const existing = map.get(key) ?? [];
      map.set(key, [...existing, event]);
    }
    return map;
  }, []);

  const calendarDays = getSaturdayCalendarDays(
    viewDate.getFullYear(),
    viewDate.getMonth(),
  );

  const sortedEvents = useMemo(
    () =>
      [...upcomingEvents].sort(
        (a, b) => parseEventDate(a.date).getTime() - parseEventDate(b.date).getTime(),
      ),
    [],
  );

  const filteredEvents = useMemo(() => {
    if (!selectedDate) return sortedEvents;
    const key = dateKey(selectedDate);
    return sortedEvents.filter((event) => event.date === key);
  }, [selectedDate, sortedEvents]);

  const goToPrevMonth = () => {
    setViewDate(
      (current) => new Date(current.getFullYear(), current.getMonth() - 1, 1),
    );
    setSelectedDate(null);
  };

  const goToNextMonth = () => {
    setViewDate(
      (current) => new Date(current.getFullYear(), current.getMonth() + 1, 1),
    );
    setSelectedDate(null);
  };

  const goToNextVolunteering = () => {
    setViewDate(
      new Date(
        nextVolunteeringDate.getFullYear(),
        nextVolunteeringDate.getMonth(),
        1,
      ),
    );
    setSelectedDate(nextVolunteeringDate);
  };

  return (
    <div className="grid gap-10 lg:grid-cols-5 lg:gap-12">
      <div className="lg:col-span-2">
        <Card className="p-4 md:p-6">
          <div className="mb-6 flex items-center justify-between gap-2">
            <div>
              <h2 className="font-heading text-lg font-semibold">
                {formatMonthYear(viewDate.getFullYear(), viewDate.getMonth())}
              </h2>
              <p className="mt-0.5 text-xs text-muted-foreground">
                Volunteering Saturdays only
              </p>
            </div>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={goToPrevMonth}
                className="inline-flex size-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                aria-label="Previous month"
              >
                <ChevronLeft className="size-5" />
              </button>
              <button
                type="button"
                onClick={goToNextMonth}
                className="inline-flex size-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                aria-label="Next month"
              >
                <ChevronRight className="size-5" />
              </button>
            </div>
          </div>

          <div className="mb-2 grid grid-cols-7 gap-1">
            {WEEKDAYS.map((day) => (
              <div
                key={day}
                className={cn(
                  "py-1 text-center text-xs font-medium uppercase tracking-wider",
                  day === "Sat"
                    ? "font-semibold text-primary"
                    : "text-muted-foreground",
                )}
              >
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1">
            {calendarDays.map((day, index) => {
              if (!day) {
                return <div key={`empty-${index}`} className="aspect-square" />;
              }

              const key = dateKey(day);
              const saturday = isSaturday(day);
              const hasEvents = saturday && eventsByDate.has(key);
              const isToday = isSameDay(day, today);
              const isSelected = selectedDate && isSameDay(day, selectedDate);
              const isNextVolunteering = key === volunteerScheduleConfig.nextEventDate;

              return (
                <button
                  key={key}
                  type="button"
                  disabled={!saturday}
                  onClick={() => {
                    if (!saturday) return;
                    setSelectedDate((current) =>
                      current && isSameDay(current, day) ? null : day,
                    );
                  }}
                  className={cn(
                    "relative flex aspect-square flex-col items-center justify-center rounded-lg text-sm transition-colors",
                    !saturday && "cursor-default opacity-30",
                    saturday && isSelected
                      ? "bg-primary text-primary-foreground"
                      : saturday && isToday
                        ? "bg-primary/10 font-semibold text-primary"
                        : saturday
                          ? "text-foreground hover:bg-muted"
                          : "text-muted-foreground",
                    hasEvents && !isSelected && "font-medium",
                    isNextVolunteering &&
                      saturday &&
                      !isSelected &&
                      "ring-2 ring-primary/30",
                  )}
                >
                  {day.getDate()}
                  {hasEvents && !isNextVolunteering && (
                    <span
                      className={cn(
                        "absolute bottom-1.5 size-1.5 rounded-full",
                        isSelected ? "bg-primary-foreground" : "bg-primary",
                      )}
                    />
                  )}
                  {isNextVolunteering && saturday && (
                    <span
                      className="absolute right-0 top-0 z-10 flex size-6 items-center justify-center rounded-bl-md border-l border-b border-primary/25 bg-primary/10"
                      aria-hidden
                    >
                      <BloomLogoIcon className="size-4 text-xs" />
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <Button
            type="button"
            variant="outline"
            className="mt-6 w-full rounded-full"
            onClick={goToNextVolunteering}
          >
            Go to Next Volunteering
          </Button>
        </Card>
      </div>

      <div className="lg:col-span-3">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="font-heading text-2xl font-semibold">
              {selectedDate ? "Events on Selected Day" : "All Upcoming Events"}
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              {selectedDate
                ? formatEventDate(dateKey(selectedDate))
                : `${sortedEvents.length} Saturday events scheduled — tap a date to filter`}
            </p>
          </div>
          {selectedDate && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setSelectedDate(null)}
            >
              Show all
            </Button>
          )}
        </div>

        {filteredEvents.length > 0 ? (
          <div className="space-y-4">
            {filteredEvents.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                isNext={event.date === volunteerScheduleConfig.nextEventDate}
              />
            ))}
          </div>
        ) : (
          <Card className="text-center">
            <CalendarDays className="mx-auto size-10 text-muted-foreground/50" />
            <p className="mt-4 font-medium">No events on this day</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Volunteering happens on Saturdays only. Select a Saturday or view
              all upcoming events.
            </p>
            <Button
              type="button"
              variant="outline"
              className="mt-4 rounded-full"
              onClick={() => setSelectedDate(null)}
            >
              Show all events
            </Button>
          </Card>
        )}
      </div>
    </div>
  );
}
