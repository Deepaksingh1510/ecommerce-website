"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { PiArrowElbowDownLeft, PiMagnifyingGlass } from "react-icons/pi";
import { formatPrice } from "@/lib/format";

export type SearchEntry = {
  id: number;
  brand: string;
  title: string;
  category: string;
  price: number;
  src: string;
};

type Props = {
  index: SearchEntry[];
  open: boolean;
  onClose: () => void;
};

const MAX_RESULTS = 8;

function search(index: SearchEntry[], query: string) {
  const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
  if (terms.length === 0) return index.slice(-MAX_RESULTS).reverse();
  return index
    .filter((entry) => {
      const haystack = `${entry.brand} ${entry.title} ${entry.category}`.toLowerCase();
      return terms.every((term) => haystack.includes(term));
    })
    .slice(0, MAX_RESULTS);
}

// Opened many times a session, so it deliberately has no open/close animation.
function SearchDialog({ index, open, onClose }: Props) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const results = useMemo(() => search(index, query), [index, query]);

  useEffect(() => {
    if (!open) return;
    setQuery("");
    setActive(0);
    inputRef.current?.focus();
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  const go = (entry: SearchEntry | undefined) => {
    if (!entry) return;
    onClose();
    router.push(`/products/${entry.id}`);
  };

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActive((i) => Math.min(i + 1, results.length - 1));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActive((i) => Math.max(i - 1, 0));
    } else if (event.key === "Enter") {
      event.preventDefault();
      go(results[active]);
    } else if (event.key === "Escape") {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-drawer flex items-start justify-center px-4 pt-[12vh]">
      <div aria-hidden onClick={onClose} className="absolute inset-0 bg-black/40" />
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Search products"
        onKeyDown={onKeyDown}
        className="relative w-full max-w-xl overflow-hidden rounded-3xl bg-surface shadow-[0_24px_80px_-20px_rgb(0_0_0/0.5)] ring-1 ring-line/[0.08]"
      >
        <div className="flex items-center gap-3 border-b border-line/[0.08] px-5">
          <PiMagnifyingGlass size={20} className="shrink-0 text-ink-soft" aria-hidden />
          <input
            ref={inputRef}
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setActive(0);
            }}
            placeholder="Search products"
            aria-label="Search products"
            aria-controls="search-results"
            aria-activedescendant={
              results[active] ? `search-${results[active].id}` : undefined
            }
            className="h-14 w-full bg-transparent text-base text-ink outline-none placeholder:text-ink-soft focus-visible:ring-0 focus-visible:ring-offset-0"
          />
          <kbd className="hidden rounded-md bg-line/[0.06] px-1.5 py-0.5 font-sans text-xs text-ink-soft sm:block">
            Esc
          </kbd>
        </div>

        {results.length > 0 ? (
          <>
            {!query && (
              <p className="px-5 pb-1 pt-4 text-xs font-medium text-ink-soft">
                New arrivals
              </p>
            )}
            <ul
              id="search-results"
              role="listbox"
              className="max-h-[60vh] overflow-y-auto p-2"
            >
              {results.map((entry, i) => (
                <li
                  key={entry.id}
                  id={`search-${entry.id}`}
                  role="option"
                  aria-selected={i === active}
                  onMouseMove={() => setActive(i)}
                  onClick={() => go(entry)}
                  className={`flex cursor-pointer items-center gap-3 rounded-2xl p-2 ${
                    i === active ? "bg-line/[0.06]" : ""
                  }`}
                >
                  <span className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl bg-tile">
                    <Image src={entry.src} alt="" fill sizes="96px" className="object-cover" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate font-medium">{entry.title}</span>
                    <span className="block truncate text-sm text-ink-soft">{entry.brand} · {entry.category}</span>
                  </span>
                  <span className="price shrink-0 text-sm font-medium">
                    {formatPrice(entry.price)}
                  </span>
                  {i === active && (
                    <PiArrowElbowDownLeft
                      size={16}
                      aria-hidden
                      className="shrink-0 text-ink-soft"
                    />
                  )}
                </li>
              ))}
            </ul>
          </>
        ) : (
          <div className="px-5 py-12 text-center">
            <p className="font-medium">No products match &ldquo;{query}&rdquo;</p>
            <p className="mt-1 text-sm text-ink-soft">
              Try a brand or product, like &ldquo;Sony&rdquo; or &ldquo;headphones&rdquo;.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default SearchDialog;
