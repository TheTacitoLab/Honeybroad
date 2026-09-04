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
