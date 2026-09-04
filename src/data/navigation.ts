import { developments } from "./developments";

export type NavItem = {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
};

/**
 * Primary navigation. The Developments dropdown is generated from the
 * developments data so new projects appear automatically.
 */
export const navigation: NavItem[] = [
  { label: "About", href: "/#about" },
  {
    label: "Developments",
    href: "/developments",
    children: [
      { label: "All developments", href: "/developments" },
      ...developments.map((d) => ({
        label: d.name,
        href: `/developments/${d.slug}`,
      })),
    ],
  },
  { label: "Contact", href: "/contact" },
];
