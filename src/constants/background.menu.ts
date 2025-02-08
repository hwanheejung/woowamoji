// COLOR
export enum BackgroundColor {
  WHITE = '#FFFFFF',
  LIGHT_GRAY = '#E0E0E0',
  BEIGE = '#F5F5DC',
  CREAM = '#FFF8E7',
  LAVENDER_BLUSH = '#FFF0F5',
  LIGHT_BLUE = '#D7E3FC',
  LIGHT_PINK = '#FCE4EC',
  LIGHT_MINT = '#E7FFE7',
  DARK_BROWN = '#4E342E',
  DARK_GRAY = '#353535',
  NAVY = '#162447',
  DEEP_BLUE = '#1B1F3B',
  CHARCOAL = '#1A1A1A',
}

// THEME
export type BackgroundTheme = 'B-0' | 'B-1' | 'B-2' | 'B-3' | 'B-4'

export interface BackgroundThemeInfo {
  theme: BackgroundTheme
  name: string
}

export const BACKGROUND_THEME: Record<BackgroundTheme, BackgroundThemeInfo> = {
  'B-0': {
    theme: 'B-0',
    name: '눈사람',
  },
  'B-1': {
    theme: 'B-1',
    name: '대왕 입',
  },
  'B-2': {
    theme: 'B-2',
    name: '네잎클로버',
  },
  'B-3': {
    theme: 'B-3',
    name: '숲',
  },
  'B-4': {
    theme: 'B-4',
    name: '하트 리본',
  },
}
