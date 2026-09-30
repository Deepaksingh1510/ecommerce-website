"use client";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import { PiMinus, PiPlus } from "react-icons/pi";
import { addtoCart, openCart } from "@/slices/cartSlice";
import { formatPrice } from "@/lib/format";
import type { CartItem } from "@/slices/cartSlice";

type Props = {
  product: Pick<CartItem, "id" | "title" | "price" | "mainImageUrl">;
};

function AddToCart({ product }: Props) {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const actionsRef = useRef<HTMLDivElement>(null);
  const [actionsVisible, setActionsVisible] = useState(true);

  // On phones the buttons scroll away quickly; once they're off screen a
  // compact bar slides up from the bottom so buying is always one tap away.
  useEffect(() => {
    const target = actionsRef.current;
    if (!target) return;
    const observer = new IntersectionObserver(([entry]) =>
      setActionsVisible(entry.isIntersecting || entry.boundingClientRect.top > 0)
    );
    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  const addItem = (notify: boolean) => {
    dispatch(
      addtoCart({
        id: product.id,
        title: product.title,
        price: product.price,
        mainImageUrl: product.mainImageUrl,
        quantity,
        totalPrice: product.price * quantity,
      })
    );
    if (notify) {
      toast(`Added ${product.title} to your cart`, {
        action: { label: "View cart", onClick: () => dispatch(openCart()) },
      });
    }
  };

  return (
    <>
      <div ref={actionsRef}>
        <div className="flex gap-3">
          <div
            className="flex h-12 shrink-0 items-center rounded-full ring-1 ring-inset ring-line/15"
            role="group"
            aria-label="Quantity"
          >
            <button
              type="button"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              disabled={quantity <= 1}
              className="icon-btn h-12 w-11 disabled:opacity-30"
              aria-label="Decrease quantity"
            >
              <PiMinus size={16} />
            </button>
            <span className="price w-6 text-center text-lg" aria-live="polite">
              {quantity}
            </span>
            <button
              type="button"
              onClick={() => setQuantity((q) => q + 1)}
              className="icon-btn h-12 w-11"
              aria-label="Increase quantity"
            >
              <PiPlus size={16} />
            </button>
          </div>

          <button
            type="button"
            className="btn-primary flex-1"
            onClick={() => addItem(true)}
          >
            Add to cart
            {quantity > 1 && (
              <span className="price opacity-80">
                · {formatPrice(product.price * quantity)}
              </span>
            )}
          </button>
        </div>

        <button
          type="button"
          className="btn-secondary mt-3 w-full"
          onClick={() => {
            addItem(false);
            dispatch(openCart());
          }}
        >
          Buy now
        </button>
      </div>

      <div
        aria-hidden={actionsVisible}
        className={`fixed inset-x-0 bottom-0 z-header border-t border-line/[0.08] bg-canvas/90 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 backdrop-blur-xl transition-transform duration-300 ease-out md:hidden ${
          actionsVisible ? "invisible translate-y-full" : "visible translate-y-0"
        }`}
      >
        <div className="flex items-center gap-3">
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium">{product.title}</p>
            <p className="price text-sm text-ink-soft">
              {formatPrice(product.price)}
            </p>
          </div>
          <button
            type="button"
            className="btn-primary h-11 px-5"
            onClick={() => addItem(true)}
            tabIndex={actionsVisible ? -1 : 0}
          >
            Add to cart
          </button>
        </div>
      </div>
    </>
  );
}

export default AddToCart;
