import { navigation } from "@/data/navigation";
import { site } from "@/data/site";
import { Lockup } from "@/components/brand/Logo";
import { TransitionLink } from "@/components/motion/TransitionLink";

/** A slim strip. Everything that matters is already on the page above it. */
export function Footer() {
  return (
    <footer data-tone="deep" className="tone-deep relative z-[1] bg-deep text-cream">
      <div className="wrap gutter flex flex-col gap-8 border-t border-cream/15 py-10 lg:flex-row lg:items-center lg:justify-between">
        <TransitionLink
          href="/"
          aria-label="Honeybroad home"
          className="relative self-start before:absolute before:-inset-x-1 before:-inset-y-3 before:content-['']"
        >
          <Lockup className="h-5 w-auto opacity-90" />
        </TransitionLink>

        <nav aria-label="Footer">
          <ul className="text-small flex flex-wrap gap-x-7 gap-y-3">
            {navigation.map((item) => (
              <li key={item.href}>
                <TransitionLink href={item.href} className="link-line opacity-90 hover:opacity-100">
                  {item.label}
                </TransitionLink>
              </li>
            ))}
            <li>
              <a href={`mailto:${site.email}`} className="link-underline opacity-90 hover:opacity-100">
                {site.email}
              </a>
            </li>
          </ul>
        </nav>

        <p className="text-small whitespace-nowrap text-cream/85">
          © {site.copyrightYear} {site.name}
        </p>
      </div>
    </footer>
  );
}
