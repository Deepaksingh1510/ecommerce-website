"use client";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import { PiPlus } from "react-icons/pi";
import { addtoCart, openCart } from "@/slices/cartSlice";
import type { ProductSummary } from "@/lib/products";

type Props = { product: ProductSummary };

function QuickAdd({ product }: Props) {
  const dispatch = useDispatch();

  return (
    <button
      type="button"
      onClick={() => {
        dispatch(
          addtoCart({
            id: product.id,
            title: product.title,
            price: product.price,
            mainImageUrl: product.images[0].src,
            quantity: 1,
            totalPrice: product.price,
          })
        );
        toast(`Added ${product.title} to your cart`, {
          action: { label: "View cart", onClick: () => dispatch(openCart()) },
        });
      }}
      aria-label={`Add ${product.title} to cart`}
      title="Add to cart"
      className="grid h-10 w-10 place-items-center rounded-full bg-line/[0.06] text-ink transition-[background-color,color,transform] duration-200 ease-out hover:bg-accent hover:text-on-accent active:scale-[0.92] group-hover:bg-ink group-hover:text-canvas group-hover:hover:bg-accent group-hover:hover:text-on-accent"
    >
      <PiPlus size={18} />
    </button>
  );
}

export default QuickAdd;
