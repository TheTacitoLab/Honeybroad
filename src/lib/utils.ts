/** Join class names, skipping falsy values. */
export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export type Tone = "deep" | "cream" | "white";

/** Background + foreground classes for each ground colour. */
export const toneClasses: Record<Tone, string> = {
  deep: "bg-deep text-cream tone-deep",
  cream: "bg-cream text-deep",
  white: "bg-white text-deep",
};

/** Muted foreground for each ground (via opacity, not new colours). */
export const toneMuted: Record<Tone, string> = {
  deep: "text-cream/75",
  cream: "text-deep/75",
  white: "text-deep/75",
};

/** Hairline colour for each ground. */
export const toneRule: Record<Tone, string> = {
  deep: "border-cream/20",
  cream: "border-deep/15",
  white: "border-deep/15",
};
