import Link from "next/link";

export default function NotFound() {
  return (
    <section className="container-page flex min-h-[60dvh] flex-col items-start justify-center py-24">
      <p className="price text-ink-soft">404</p>
      <h1 className="mt-2 text-4xl font-semibold tracking-[-0.035em] md:text-5xl">
        We couldn&apos;t find that page
      </h1>
      <p className="mt-4 max-w-[46ch] text-lg text-ink-soft">
        The product or category may have moved. Everything we sell is in the
        full catalogue.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link href="/category/All" className="btn-primary">
          All products
        </Link>
        <Link href="/" className="btn-secondary">
          Home
        </Link>
      </div>
    </section>
  );
}
