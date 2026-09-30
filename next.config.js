/** @type {import('next').NextConfig} */
const nextConfig = {
  // Lets a production build/preview run alongside `next dev` without the two
  // overwriting each other's output (e.g. NEXT_DIST_DIR=.next-verify).
  distDir: process.env.NEXT_DIST_DIR || ".next",
  images: {
    // All images are self-hosted in public/images (see scripts/optimize-images.mjs),
    // so no remote hosts are allowed. WebP only: AVIF is slightly smaller but
    // several times slower to encode, which made first loads feel sluggish.
    formats: ["image/webp"],
    deviceSizes: [640, 828, 1080, 1280, 1920],
    imageSizes: [96, 160, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 365,
  },
};

module.exports = nextConfig;
