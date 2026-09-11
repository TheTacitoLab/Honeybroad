import type { Metadata, Viewport } from "next";
import { DM_Sans, DM_Serif_Display } from "next/font/google";
import { site } from "@/data/site";
import { navigation } from "@/data/navigation";
import { pageMetadata } from "@/lib/seo";
import { MotionProvider } from "@/components/motion/MotionProvider";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { PageTransitionProvider } from "@/components/motion/PageTransition";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";

const serif = DM_Serif_Display({
  weight: "400",
  style: "normal",
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

// Used for a single line on the homepage, so it is not preloaded everywhere.
const serifItalic = DM_Serif_Display({
  weight: "400",
  style: "italic",
  subsets: ["latin"],
  variable: "--font-serif-italic",
  display: "swap",
  preload: false,
});

const sans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const home = pageMetadata({
  title: "Honeybroad Homes | Contemporary Homes in Cornwall",
  description: site.description,
  path: "/",
  absoluteTitle: true,
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Honeybroad Homes | Contemporary Homes in Cornwall",
    template: "%s | Honeybroad Homes",
  },
  description: site.description,
  openGraph: home.openGraph,
  twitter: home.twitter,
};

export const viewport: Viewport = {
  themeColor: "#1D617A",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en-GB"
      className={`${serif.variable} ${serifItalic.variable} ${sans.variable}`}
    >
      <body className="flex min-h-svh flex-col overflow-x-clip">
        {/* Without JavaScript, show everything that would otherwise wait for a reveal. */}
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important}section[data-hero]{height:auto;min-height:100svh}[data-hero] p[data-reveal]{position:static;margin-top:1.5rem}`}</style>
        </noscript>
        <MotionProvider>
          <SmoothScroll>
            <PageTransitionProvider>
              <a
                href="#main"
                className="text-small sr-only z-[90] bg-cream px-4 py-3 text-deep focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
              >
                Skip to content
              </a>
              <Header navigation={navigation} />
              <main id="main" className="relative flex-1">
                {children}
              </main>
              <Footer />
            </PageTransitionProvider>
          </SmoothScroll>
        </MotionProvider>
      </body>
    </html>
  );
}
