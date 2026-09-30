"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { PiMagnifyingGlass, PiShoppingBag } from "react-icons/pi";
import SearchDialog, { type SearchEntry } from "@/components/SearchDialog";
import { openCart, selectItemCount } from "@/slices/cartSlice";

const navLinks = [
  { href: "/", label: "Home", match: (path: string) => path === "/" },
  // Sale has no page yet, so it renders as muted text rather than a dead link.
  { href: null, label: "Sale", match: () => false },
  {
    href: "/category/All",
    label: "Products",
    match: (path: string) => path.startsWith("/category"),
  },
];

function Header({ searchIndex }: { searchIndex: SearchEntry[] }) {
  const pathname = usePathname();
  const dispatch = useDispatch();
  const itemCount = useSelector(selectItemCount);
  const [searchOpen, setSearchOpen] = useState(false);

  // Ctrl/Cmd+K anywhere, or "/" when not already typing, opens search.
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement;
      const typing =
        target.isContentEditable ||
        /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName);
      if (
        (event.key === "k" && (event.metaKey || event.ctrlKey)) ||
        (event.key === "/" && !typing)
      ) {
        event.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <>
      <header className="sticky top-0 z-header border-b border-line/[0.06] bg-canvas/80 backdrop-blur-xl backdrop-saturate-150">
        <div className="container-page flex h-16 items-center gap-2 sm:gap-4">
          <Link
            href="/"
            className="flex items-center gap-2 rounded-full"
            aria-label="SwiftCart home"
          >
            <span
              aria-hidden
              className="grid h-7 w-7 place-items-center rounded-[9px] bg-accent font-display text-sm font-bold text-on-accent"
            >
              S
            </span>
            <span className="font-display text-lg font-semibold tracking-tight">
              SwiftCart
            </span>
          </Link>

          <nav
            aria-label="Primary"
            className="flex items-center text-[15px] sm:ml-4 sm:gap-1"
          >
            {navLinks.map(({ href, label, match }) => {
              if (!href) {
                return (
                  <span
                    key={label}
                    className="hidden cursor-default rounded-full px-3 py-1.5 text-ink-soft/60 sm:inline"
                    title="Sale is coming soon"
                  >
                    {label}
                  </span>
                );
              }
              const active = match(pathname);
              return (
                <Link
                  key={href}
                  href={href}
                  aria-current={active ? "page" : undefined}
                  className={`rounded-full px-2.5 py-1.5 transition-colors duration-200 sm:px-3 ${
                    active
                      ? "bg-line/[0.07] text-ink"
                      : "text-ink-soft hover:text-ink"
                  }`}
                >
                  {label}
                </Link>
              );
            })}
          </nav>

          <div className="ml-auto flex items-center gap-1">
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              aria-label="Search products"
              aria-keyshortcuts="Control+K Meta+K /"
              className="icon-btn md:w-60 md:justify-start md:gap-2.5 md:bg-line/[0.05] md:px-3.5 md:text-sm md:text-ink-soft md:hover:bg-line/[0.08]"
            >
              <PiMagnifyingGlass size={20} className="shrink-0 md:h-4 md:w-4" />
              <span className="hidden md:inline">Search products</span>
              <kbd className="ml-auto hidden rounded-md bg-line/[0.06] px-1.5 py-0.5 font-sans text-xs md:inline">
                Ctrl K
              </kbd>
            </button>

            <button
              type="button"
              onClick={() => dispatch(openCart())}
              className="icon-btn relative"
              aria-label={`Open cart, ${itemCount} ${itemCount === 1 ? "item" : "items"}`}
            >
              <PiShoppingBag size={22} />
              {itemCount > 0 && (
                <span className="price absolute -right-0.5 -top-0.5 grid h-[18px] min-w-[18px] place-items-center rounded-full bg-accent px-1 text-[11px] font-semibold leading-none text-on-accent">
                  {itemCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Rendered outside <header>: its backdrop-filter would otherwise trap
          this fixed-position dialog inside the header's box. */}
      <SearchDialog
        index={searchIndex}
        open={searchOpen}
        onClose={() => setSearchOpen(false)}
      />
    </>
  );
}

export default Header;
