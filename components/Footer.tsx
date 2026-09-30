import Link from "next/link";
import {
  PiFacebookLogo,
  PiInstagramLogo,
  PiTwitterLogo,
} from "react-icons/pi";
import { categories } from "@/lib/products";

const socials = [
  { label: "Instagram", Icon: PiInstagramLogo },
  { label: "Twitter", Icon: PiTwitterLogo },
  { label: "Facebook", Icon: PiFacebookLogo },
];

function Footer() {
  return (
    <footer className="mt-16 border-t border-line/[0.06]">
      <div className="container-page grid gap-10 py-12 md:grid-cols-12 md:py-16">
        <div className="md:col-span-5">
          <p className="font-display text-lg font-semibold tracking-tight">
            SwiftCart
          </p>
          <p className="mt-2 max-w-[34ch] text-ink-soft">
            Gaming, tech and fragrance, delivered fast.
          </p>
        </div>

        <nav aria-label="Shop" className="md:col-span-4">
          <p className="text-sm font-medium">Shop</p>
          <ul className="mt-3 grid grid-cols-2 gap-x-6 gap-y-2 text-ink-soft">
            {categories.map((category) => (
              <li key={category}>
                <Link
                  href={`/category/${category}`}
                  className="transition-colors hover:text-ink"
                >
                  {category === "All" ? "All products" : category}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="md:col-span-3">
          <p className="text-sm font-medium">Follow</p>
          <ul className="-ml-2 mt-2 flex gap-1">
            {socials.map(({ label, Icon }) => (
              <li key={label}>
                <span
                  className="inline-flex h-10 w-10 items-center justify-center text-ink-soft"
                  title={`${label} (coming soon)`}
                >
                  <Icon size={20} aria-hidden />
                  <span className="sr-only">{label}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="container-page flex flex-col gap-2 border-t border-line/[0.06] py-6 text-sm text-ink-soft sm:flex-row sm:justify-between">
        <p>&copy; {new Date().getFullYear()} SwiftCart</p>
        <p>Prices shown in GBP</p>
      </div>
    </footer>
  );
}

export default Footer;
