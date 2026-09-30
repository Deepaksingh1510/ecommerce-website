import type { Config } from "tailwindcss";

// Colors resolve to CSS variables defined in app/globals.css so light and
// dark mode share one set of class names.
const token = (name: string) => `rgb(var(--${name}) / <alpha-value>)`;

const config: Config = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  future: {
    // Only apply :hover styles on devices that can actually hover, so taps
    // on touch screens don't leave cards stuck in their hover state.
    hoverOnlyWhenSupported: true,
  },
  theme: {
    extend: {
      colors: {
        canvas: token("canvas"),
        surface: token("surface"),
        tile: token("tile"),
        ink: token("ink"),
        "ink-soft": token("ink-soft"),
        line: token("line"),
        accent: token("accent"),
        "on-accent": token("on-accent"),
      },
      // Tailwind 3.3 skips these steps; they're used for hairlines and scrims.
      opacity: {
        15: "0.15",
        55: "0.55",
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        sans: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      transitionTimingFunction: {
        out: "cubic-bezier(0.23, 1, 0.32, 1)",
        drawer: "cubic-bezier(0.32, 0.72, 0, 1)",
      },
      zIndex: {
        header: "30",
        overlay: "40",
        drawer: "50",
      },
    },
  },
  plugins: [],
};
export default config;
