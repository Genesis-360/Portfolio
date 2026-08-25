import localFont from "next/font/local";

export const anton = localFont({
  src: [{ path: "./fonts/Anton-Regular.ttf", weight: "400", style: "normal" }],
  variable: "--font-anton",
  display: "swap",
  fallback: ["Impact", "Arial Narrow", "sans-serif"],
});

export const openSauce = localFont({
  src: [
    { path: "./fonts/OpenSauceOne-Regular.ttf", weight: "400", style: "normal" },
    { path: "./fonts/OpenSauceOne-Bold.ttf", weight: "700", style: "normal" },
  ],
  variable: "--font-open-sauce",
  display: "swap",
  fallback: ["system-ui", "Helvetica", "sans-serif"],
});

export const amsterdam = localFont({
  src: [{ path: "./fonts/AmsterdamFour-Regular.ttf", weight: "400", style: "normal" }],
  variable: "--font-amsterdam",
  display: "swap",
  fallback: ["cursive", "Snell Roundhand", "serif"],
});
