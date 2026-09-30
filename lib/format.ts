// Kept separate from lib/products so client components can format prices
// without pulling the whole catalogue into the browser bundle.
const gbp = new Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "GBP",
});

export function formatPrice(value: number) {
  return gbp.format(value);
}
