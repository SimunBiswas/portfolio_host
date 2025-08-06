/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  safelist: [
    "from-[#83D9F4]",
    "via-[#3C7E9E]",
    "to-[#000B13]",
    "from-[#E29999]",
    "via-[#AF4848]",
    "to-[#5D0D0D]",
    "from-[#CA843A]",
    "to-[#110602]",
    "from-[#FCCAAB]",
    "via-[#5A4A1F]",
    "to-[#110B0C]",
  ],
  theme: {
    extend: {
      fontFamily: {
        orbitron: ['var(--font-orbitron)', 'sans-serif'], // ✅ correct variable
        geist: ['var(--font-geist-sans)', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'monospace'],
      },
    },
  },
  plugins: [],
};
