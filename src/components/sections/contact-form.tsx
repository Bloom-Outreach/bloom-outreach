"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { FieldError } from "@/components/ui/field-error";
import {
  contactFormSchema,
  type ContactFormValues,
} from "@/lib/validation";

export function ContactForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    mode: "onTouched",
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = handleSubmit(async () => {
    await new Promise((resolve) => setTimeout(resolve, 600));
    reset();
  });

  return (
    <Card className="shadow-lg shadow-primary/5">
      <h3 className="font-heading text-xl font-semibold md:text-2xl">
        Send a Message
      </h3>
      <p className="mt-2 text-sm text-muted-foreground">
        We typically respond within 1–2 business days.
      </p>

      {isSubmitSuccessful && (
        <p className="mt-6 flex items-start gap-2 rounded-2xl border border-bloom-green/25 bg-bloom-green/10 px-4 py-3 text-sm text-bloom-green">
          <CheckCircle2 className="mt-0.5 size-4 shrink-0" />
          Thanks for reaching out! We&apos;ll get back to you within 1–2 business
          days.
        </p>
      )}

      <form className="mt-8 space-y-5" onSubmit={onSubmit} noValidate>
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="contact-firstName" className="mb-2 block text-sm font-medium">
              First Name
            </label>
            <Input
              id="contact-firstName"
              className="h-11 rounded-xl"
              autoComplete="given-name"
              aria-invalid={Boolean(errors.firstName)}
              {...register("firstName")}
            />
            <FieldError message={errors.firstName?.message} />
          </div>
          <div>
            <label htmlFor="contact-lastName" className="mb-2 block text-sm font-medium">
              Last Name
            </label>
            <Input
              id="contact-lastName"
              className="h-11 rounded-xl"
              autoComplete="family-name"
              aria-invalid={Boolean(errors.lastName)}
              {...register("lastName")}
            />
            <FieldError message={errors.lastName?.message} />
          </div>
        </div>
        <div>
          <label htmlFor="contact-email" className="mb-2 block text-sm font-medium">
            Email
          </label>
          <Input
            id="contact-email"
            type="email"
            autoComplete="email"
            className="h-11 rounded-xl"
            aria-invalid={Boolean(errors.email)}
            {...register("email")}
          />
          <FieldError message={errors.email?.message} />
        </div>
        <div>
          <label htmlFor="contact-subject" className="mb-2 block text-sm font-medium">
            Subject
          </label>
          <Input
            id="contact-subject"
            className="h-11 rounded-xl"
            aria-invalid={Boolean(errors.subject)}
            {...register("subject")}
          />
          <FieldError message={errors.subject?.message} />
        </div>
        <div>
          <label htmlFor="contact-message" className="mb-2 block text-sm font-medium">
            Message
          </label>
          <Textarea
            id="contact-message"
            className="min-h-[140px] rounded-xl"
            aria-invalid={Boolean(errors.message)}
            {...register("message")}
          />
          <FieldError message={errors.message?.message} />
        </div>
        <Button
          type="submit"
          size="lg"
          className="rounded-full px-7"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              Sending...
              <Loader2 className="size-4 animate-spin" />
            </>
          ) : (
            <>
              Send Message
              <Send className="size-4" />
            </>
          )}
        </Button>
      </form>
    </Card>
  );
}
