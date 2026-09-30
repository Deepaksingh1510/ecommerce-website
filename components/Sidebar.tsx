"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import {
  PiMinus,
  PiPlus,
  PiShoppingBag,
  PiTrash,
  PiX,
} from "react-icons/pi";
import {
  closeCart,
  decrementQuantity,
  incrementQuantity,
  removefromCart,
  selectIsCartOpen,
  selectItemCount,
  selectItems,
  selectSubtotal,
} from "@/slices/cartSlice";
import { formatPrice } from "@/lib/format";

function CartDrawer() {
  const dispatch = useDispatch();
  const isOpen = useSelector(selectIsCartOpen);
  const items = useSelector(selectItems);
  const itemCount = useSelector(selectItemCount);
  const subtotal = useSelector(selectSubtotal);
  const closeRef = useRef<HTMLButtonElement>(null);

  const close = () => dispatch(closeCart());

  useEffect(() => {
    if (!isOpen) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    document.documentElement.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") dispatch(closeCart());
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.documentElement.style.overflow = "";
      previouslyFocused?.focus();
    };
  }, [isOpen, dispatch]);

  return (
    <>
      <div
        aria-hidden
        onClick={close}
        className={`fixed inset-0 z-overlay bg-black/40 transition-opacity ${
          isOpen
            ? "opacity-100 duration-300"
            : "pointer-events-none opacity-0 duration-200"
        }`}
      />

      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
        className={`fixed inset-y-0 right-0 z-drawer flex w-full flex-col bg-surface shadow-[0_0_60px_-15px_rgb(0_0_0/0.35)] ease-drawer sm:max-w-md ${
          // Visibility flips instantly on open (so focus can move in) and only
          // waits for the slide-out on close. Closing is faster than opening.
          isOpen
            ? "visible translate-x-0 transition-transform duration-500"
            : "invisible translate-x-full transition-[transform,visibility] duration-300"
        }`}
      >
        <div className="flex h-16 items-center justify-between border-b border-line/[0.06] px-5">
          <h2 className="text-lg font-semibold tracking-tight">
            Your cart{" "}
            <span className="price font-sans text-base font-normal text-ink-soft">
              ({itemCount})
            </span>
          </h2>
          <button
            ref={closeRef}
            type="button"
            onClick={close}
            className="icon-btn -mr-2"
            aria-label="Close cart"
          >
            <PiX size={20} />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
            <span className="grid h-16 w-16 place-items-center rounded-2xl bg-tile text-ink-soft">
              <PiShoppingBag size={28} />
            </span>
            <p className="mt-5 font-display text-xl font-semibold tracking-tight">
              Your cart is empty
            </p>
            <p className="mt-2 max-w-[28ch] text-ink-soft">
              Products you add will show up here.
            </p>
            <Link href="/category/All" onClick={close} className="btn-primary mt-6">
              Browse products
            </Link>
          </div>
        ) : (
          <>
            <ul className="flex-1 divide-y divide-line/[0.06] overflow-y-auto overscroll-contain px-5">
              {items.map((item) => (
                <li key={item.id} className="flex gap-4 py-5">
                  <Link
                    href={`/products/${item.id}`}
                    onClick={close}
                    className="relative h-24 w-24 shrink-0 overflow-hidden rounded-2xl bg-tile"
                  >
                    <Image
                      src={item.mainImageUrl}
                      alt={item.title}
                      fill
                      sizes="96px"
                      className="object-cover"
                    />
                  </Link>

                  <div className="flex min-w-0 flex-1 flex-col">
                    <div className="flex items-start justify-between gap-3">
                      <Link
                        href={`/products/${item.id}`}
                        onClick={close}
                        className="truncate font-medium hover:underline hover:underline-offset-4"
                      >
                        {item.title}
                      </Link>
                      <p className="price shrink-0 font-medium">
                        {formatPrice(item.totalPrice)}
                      </p>
                    </div>
                    <p className="price mt-0.5 text-sm text-ink-soft">
                      {formatPrice(item.price)} each
                    </p>

                    <div className="mt-auto flex items-center justify-between pt-3">
                      <div className="flex items-center rounded-full ring-1 ring-inset ring-line/15">
                        <button
                          type="button"
                          onClick={() =>
                            dispatch(decrementQuantity({ itemId: item.id }))
                          }
                          disabled={item.quantity <= 1}
                          className="icon-btn h-8 w-8 disabled:opacity-30"
                          aria-label={`Decrease quantity of ${item.title}`}
                        >
                          <PiMinus size={14} />
                        </button>
                        <span className="price w-6 text-center text-sm">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            dispatch(incrementQuantity({ itemId: item.id }))
                          }
                          className="icon-btn h-8 w-8"
                          aria-label={`Increase quantity of ${item.title}`}
                        >
                          <PiPlus size={14} />
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          dispatch(removefromCart(item.id));
                          toast(`Removed ${item.title} from your cart`);
                        }}
                        className="icon-btn h-8 w-8 text-ink-soft hover:text-ink"
                        aria-label={`Remove ${item.title} from cart`}
                      >
                        <PiTrash size={18} />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="border-t border-line/[0.06] px-5 pb-6 pt-5">
              <div className="flex items-baseline justify-between">
                <span className="text-ink-soft">Subtotal</span>
                <span className="price font-display text-2xl font-semibold tracking-tight">
                  {formatPrice(subtotal)}
                </span>
              </div>
              <p className="mt-1 text-sm text-ink-soft">
                Shipping and taxes are calculated at checkout.
              </p>
              <button
                type="button"
                onClick={() => toast("Checkout isn't available yet.")}
                className="btn-primary mt-5 w-full"
              >
                Checkout
              </button>
            </div>
          </>
        )}
      </aside>
    </>
  );
}

export default CartDrawer;
