import { FONTS } from './src/constants'
import type { Config } from 'tailwindcss'

const generateFontFamily = () => {
  return Object.entries(FONTS).reduce((acc, [key, value]) => {
    acc[key] = [`var(${value.variable})`, 'sans-serif']
    return acc
  }, {} as Record<string, string[]>)
}

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors: {
      pink: '#FF3589',
      yellow: '#FFF500',
      blue: '#0094FF',
      green: '#00E431',
      baeminBlue: '#48D1CC',
      gray: {
        0: '#fff',
        100: '#000',
      },
    },
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
      },
      fontFamily: generateFontFamily(),
    },
  },
  plugins: [],
} satisfies Config
