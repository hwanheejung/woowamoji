export enum Category {
  TYPE = 'type',
  TEXT = 'text',
  BACKGROUND = 'background',
}

export enum MenuItem {
  SIZE = 'size',
  EFFECT = 'effect',
  FONT = 'font',
  TEXT_COLOR = 'color',
  BACKGROUND_COLOR = 'backgroundColor',
  BACKGROUND_THEME = 'backgroundTheme',
}

interface ItemInfo {
  key: Category | MenuItem
  name: string
}

export const CATEGORY_INFO: Record<Category, ItemInfo> = {
  [Category.TYPE]: {
    key: Category.TYPE,
    name: '타입',
  },
  [Category.TEXT]: {
    key: Category.TEXT,
    name: '텍스트',
  },
  [Category.BACKGROUND]: {
    key: Category.BACKGROUND,
    name: '배경',
  },
}

export const MENU_ITEM_INFO: Record<MenuItem, ItemInfo> = {
  [MenuItem.SIZE]: {
    key: MenuItem.SIZE,
    name: '크기',
  },
  [MenuItem.EFFECT]: {
    key: MenuItem.EFFECT,
    name: '효과',
  },
  [MenuItem.FONT]: {
    key: MenuItem.FONT,
    name: '폰트',
  },
  [MenuItem.TEXT_COLOR]: {
    key: MenuItem.TEXT_COLOR,
    name: '글자색',
  },
  [MenuItem.BACKGROUND_COLOR]: {
    key: MenuItem.BACKGROUND_COLOR,
    name: '배경색',
  },
  [MenuItem.BACKGROUND_THEME]: {
    key: MenuItem.BACKGROUND_THEME,
    name: '테마',
  },
}

export const MENU = {
  [Category.TYPE]: [MenuItem.SIZE, MenuItem.EFFECT],
  [Category.TEXT]: [MenuItem.FONT, MenuItem.TEXT_COLOR],
  [Category.BACKGROUND]: [MenuItem.BACKGROUND_COLOR, MenuItem.BACKGROUND_THEME],
} as const

// 메뉴: 효과
export enum Effect {
  NONE = 'none',
  BLINK = 'blink',
  PULSE = 'pulse',
  WOBBLE = 'wobble',
  SPIN = 'spin',
  FLOAT = 'float',
  SHAKE = 'shake',
  BOUNCE = 'bounce',
  // SLIDE_LEFT_RIGHT = 'slideLeftRight',
  // SLIDE_UP = 'slideUp',
}

// 메뉴: 텍스트 색상
export enum TextColor {
  BLACK = '#1A1A1A',
  WHITE = '#FFFFFF',
  RED = '#E63946',
  ORANGE = '#FF9000',
  YELLOW = '#FFF500',
  GREEN = '#00E431',
  BLUE = '#0094FF',
  PURPLE = '#A236FF',
  PINK = '#FF3589',
  GRAY = '#7F7F7F',
  BROWN = '#8B5A2B',
}

// 메뉴: 배경 색상
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

// 메뉴: 배경 테마
export type BackgroundTheme = 'B-0' | 'B-1' | 'B-2' | 'B-3' | 'B-4'

interface BackgroundThemeInfo {
  key: BackgroundTheme
  name: string
}

export const BACKGROUND_THEME: Record<BackgroundTheme, BackgroundThemeInfo> = {
  'B-0': {
    key: 'B-0',
    name: '눈사람',
  },
  'B-1': {
    key: 'B-1',
    name: '대왕 입',
  },
  'B-2': {
    key: 'B-2',
    name: '네잎클로버',
  },
  'B-3': {
    key: 'B-3',
    name: '숲',
  },
  'B-4': {
    key: 'B-4',
    name: '하트 리본',
  },
}
