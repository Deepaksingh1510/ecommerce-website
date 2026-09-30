import "./globals.css";
import type { Metadata, Viewport } from "next";
import { Hanken_Grotesk, Outfit } from "next/font/google";
import Providers from "@/app/providers";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import type { SearchEntry } from "@/components/SearchDialog";
import { products } from "@/lib/products";

const display = Outfit({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const body = Hanken_Grotesk({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

// Only what the header search needs, so every page's payload stays small.
const searchIndex: SearchEntry[] = products.map((product) => ({
  id: product.id,
  brand: product.brand,
  title: product.title,
  category: product.category,
  price: product.price,
  src: product.images[0].src,
}));

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
  ),
  title: {
    default: "SwiftCart",
    template: "%s | SwiftCart",
  },
  description:
    "Gaming, tech, fragrance and more: well-known products from PlayStation to Chanel, delivered fast.",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f6f6f5" },
    { media: "(prefers-color-scheme: dark)", color: "#0d0d0e" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body className="flex min-h-[100dvh] flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-drawer focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-canvas"
        >
          Skip to content
        </a>
        <Providers>
          <Header searchIndex={searchIndex} />
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
