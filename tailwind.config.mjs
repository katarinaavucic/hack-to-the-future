import { transform } from 'next/dist/build/swc/generated-native';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      keyframes: {
        bounceOnce: {
          '0%': {
            transform: 'scale(0.3) translateY(-100px)',
            opacity: '0'
          },
          '15%': {
            transform: 'scale(1) translateY(0)',
            opacity: '1'
          },
          '25%': {
            transform: 'scale(0.95)',
          },
          '35%': {
            transform: 'scale(1)',
          },
          '100%': {
            // end in the “resting” position (no rotation)
            transform: 'rotate(-1deg)',
          }
        },
        // Keyframes for the infinite wobble
        wobbleForever: {
          '100%': {
            transform: 'rotate(-1deg)'
          },
          '50%': {
            transform: 'rotate(1deg)'
          },
          '0%': {
            transform: 'rotate(-1deg)'
          }
        },
      },
      animation: {
        // 3s bounce once, then freeze at its last keyframe
        bounceOnce: 'bounceOnce 3s ease-out forwards',
        // 3s cycle for the wobble, repeated infinitely
        wobbleForever: 'wobbleForever 6s ease-in-out infinite'
      }
    }
  },
  plugins: [],
};
