import type { Metadata } from "next";
import type { ReactNode } from "react";
import "@/app/globals.css";
import { Providers } from "@/components/Providers";
import { SiteLiquidBackground } from "@/components/background/SiteLiquidBackground";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: {
    default: `${site.owner} - Senior Visual Designer Portfolio`,
    template: `%s - ${site.owner}`
  },
  description: site.heroLead,
  metadataBase: new URL("https://example.com"),
  openGraph: {
    title: `${site.owner} - Senior Visual Designer Portfolio`,
    description: site.heroLead,
    type: "website"
  }
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <SiteLiquidBackground />
          <div className="site-shell">
            <Header />
            {children}
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
