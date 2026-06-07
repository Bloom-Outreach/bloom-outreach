import Image from "next/image";
import Link from "next/link";
import { Settings } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { mockVolunteer } from "@/lib/mock-volunteer";

export function ProfileSidebar() {
  const { firstName, lastName, email, role, memberSince, avatar, focus } =
    mockVolunteer;
  const initials = `${firstName[0]}${lastName[0]}`;

  return (
    <Card className="overflow-hidden p-0">
      <div className="relative h-24 bg-gradient-to-br from-primary via-bloom-wine-deep to-bloom-pink">
        <div className="bloom-pattern absolute inset-0 opacity-20" />
      </div>

      <div className="relative px-6 pb-6">
        <div className="-mt-12 mb-4 flex justify-center">
          <div className="relative size-24 overflow-hidden rounded-3xl ring-4 ring-card shadow-xl">
            <Image
              src={avatar}
              alt={`${firstName} ${lastName}`}
              width={400}
              height={400}
              className="size-full object-cover"
            />
            <span className="absolute inset-0 flex items-center justify-center bg-primary/80 text-2xl font-semibold text-white opacity-0">
              {initials}
            </span>
          </div>
        </div>

        <div className="text-center">
          <h2 className="font-heading text-xl font-semibold">
            {firstName} {lastName}
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">{email}</p>
          <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
            <Badge variant="soft">{role}</Badge>
            <Badge variant="outline">{focus}</Badge>
          </div>
          <p className="mt-3 text-xs text-muted-foreground">
            Member since {memberSince}
          </p>
        </div>

        <Button asChild className="mt-6 w-full rounded-full" variant="outline">
          <Link href="/settings">
            <Settings className="size-4" />
            Edit Profile
          </Link>
        </Button>
      </div>
    </Card>
  );
}
