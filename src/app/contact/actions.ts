"use server";

import { site } from "@/data/site";

export type ContactValues = { name: string; email: string; message: string };

export type ContactState =
  | { status: "idle" }
  | { status: "sent" }
  | { status: "error"; message: string; values: ContactValues }
  | { status: "unconfigured"; values: ContactValues };

const MAX = { name: 120, email: 200, message: 4000 };

/**
 * Handles the contact form.
 *
 * Email delivery uses Resend when `RESEND_API_KEY` is set (and optionally
 * `CONTACT_TO_EMAIL` / `CONTACT_FROM_EMAIL`). Without a key the form reports
 * "unconfigured" and the page offers a ready-made mailto link instead, so a
 * message is never silently lost.
 */
export async function sendEnquiry(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  // Honeypot: bots fill every field.
  const honeypot = formData.get("company");
  if (typeof honeypot === "string" && honeypot) {
    return { status: "sent" };
  }

  const values: ContactValues = {
    name: String(formData.get("name") ?? "").trim().slice(0, MAX.name),
    email: String(formData.get("email") ?? "").trim().slice(0, MAX.email),
    message: String(formData.get("message") ?? "").trim().slice(0, MAX.message),
  };

  if (!values.name || !values.email || !values.message) {
    return {
      status: "error",
      message: "Please fill in your name, email and message.",
      values,
    };
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    return {
      status: "error",
      message: "That email address doesn't look right.",
      values,
    };
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return { status: "unconfigured", values };
  }

  const to = process.env.CONTACT_TO_EMAIL ?? site.email;
  const domain = new URL(site.url).hostname.replace(/^www\./, "");
  const from = process.env.CONTACT_FROM_EMAIL ?? `Honeybroad website <website@${domain}>`;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: values.email,
        subject: `Website enquiry from ${values.name}`,
        text: `Name: ${values.name}\nEmail: ${values.email}\n\n${values.message}`,
      }),
    });

    if (!res.ok) {
      console.error("Contact form delivery failed", res.status, await res.text());
      return {
        status: "error",
        message: "Something went wrong sending your message. Please email us directly.",
        values,
      };
    }
    return { status: "sent" };
  } catch (error) {
    console.error("Contact form delivery failed", error);
    return {
      status: "error",
      message: "Something went wrong sending your message. Please email us directly.",
      values,
    };
  }
}
