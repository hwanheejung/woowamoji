import { Metadata } from 'next'

export const TITLE = {
  kr: '우아모지',
  en: 'Text to GIF',
} as const

export const SITE_METADATA: Metadata = {
  title: TITLE.en,
  description: 'Text to GIF Converter',
  keywords: [
    'text to gif',
    'text gif generator',
    'animated text',
    'gif maker',
    'slack',
    'discord',
  ],
  icons: ['/favicon.ico'],
}
