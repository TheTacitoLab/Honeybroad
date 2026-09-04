"use client";

import { useActionState } from "react";
import { site } from "@/data/site";
import { sendEnquiry, type ContactState } from "@/app/contact/actions";
import { cn } from "@/lib/utils";

const field =
  "text-body w-full border-0 border-b border-cream/35 bg-transparent px-0 py-3 text-cream placeholder:text-cream/45 focus:border-cream focus:outline-none transition-colors duration-300";

const initial: ContactState = { status: "idle" };

/**
 * Three fields and a send button. If delivery isn't configured the visitor
 * gets a ready-made mailto link with their message, not a dead end.
 */
export function ContactForm() {
  const [state, action, pending] = useActionState(sendEnquiry, initial);

  if (state.status === "sent") {
    return (
      <div role="status" className="text-lede max-w-[32rem]">
        <p>Thank you. We&rsquo;ve got your message and will reply soon.</p>
      </div>
    );
  }

  const values = "values" in state ? state.values : null;
  const mailto =
    state.status === "unconfigured"
      ? `mailto:${site.email}?subject=${encodeURIComponent(`Website enquiry from ${state.values.name}`)}&body=${encodeURIComponent(state.values.message)}`
      : null;

  return (
    <form action={action} className="max-w-[32rem]">
      <div className="flex flex-col gap-8">
        <div>
          <label htmlFor="contact-name" className="text-label block opacity-80">
            Name
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            autoComplete="name"
            required
            maxLength={120}
            defaultValue={values?.name}
            className={field}
          />
        </div>
        <div>
          <label htmlFor="contact-email" className="text-label block opacity-80">
            Email
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            maxLength={200}
            defaultValue={values?.email}
            className={field}
          />
        </div>
        <div>
          <label htmlFor="contact-message" className="text-label block opacity-80">
            Message
          </label>
          <textarea
            id="contact-message"
            name="message"
            rows={5}
            required
            maxLength={4000}
            defaultValue={values?.message}
            className={cn(field, "resize-y")}
          />
        </div>
        {/* Honeypot, hidden from people. */}
        <div className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden" aria-hidden>
          <label htmlFor="contact-company">Company</label>
          <input id="contact-company" name="company" type="text" tabIndex={-1} autoComplete="off" />
        </div>
      </div>

      <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
        <button
          type="submit"
          disabled={pending}
          className="text-small border border-cream/60 px-6 py-3 text-cream transition-colors duration-300 hover:border-cream hover:bg-cream hover:text-deep disabled:opacity-60 disabled:hover:bg-transparent disabled:hover:text-cream"
        >
          {pending ? "Sending…" : "Send"}
        </button>

        {state.status === "error" ? (
          <p role="alert" className="text-small text-cream/85">
            {state.message}
          </p>
        ) : null}
      </div>

      {mailto ? (
        <p role="status" className="text-body mt-8 max-w-[30rem] text-cream/85">
          Our form isn&rsquo;t connected yet.{" "}
          <a href={mailto} className="link-underline text-cream">
            Send your message by email instead
          </a>
          .
        </p>
      ) : null}
    </form>
  );
}
