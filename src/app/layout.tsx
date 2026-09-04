import type { Metadata, Viewport } from "next";
import { DM_Sans, DM_Serif_Display } from "next/font/google";
import { site } from "@/data/site";
import { MotionProvider } from "@/components/motion/MotionProvider";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { PageTransitionProvider } from "@/components/motion/PageTransition";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";

const serif = DM_Serif_Display({
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

const sans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  axes: ["opsz"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Honeybroad Homes | Contemporary Homes in Cornwall",
    template: "%s | Honeybroad Homes",
  },
  description: site.description,
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "en_GB",
    url: "/",
    title: "Honeybroad Homes | Contemporary Homes in Cornwall",
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: "Honeybroad Homes | Contemporary Homes in Cornwall",
    description: site.description,
  },
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#1D617A",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB" className={`${serif.variable} ${sans.variable}`}>
      <body className="flex min-h-svh flex-col overflow-x-clip">
        <MotionProvider>
          <SmoothScroll>
            <PageTransitionProvider>
              <a
                href="#main"
                className="text-small sr-only z-[90] bg-cream px-4 py-3 text-deep focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
              >
                Skip to content
              </a>
              <Header />
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
