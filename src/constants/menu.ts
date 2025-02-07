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
}

export const CATEGORY_INFO = {
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

export const MENU_ITEM_INFO = {
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
}

export const MENU = {
  [Category.TYPE]: [MenuItem.SIZE, MenuItem.EFFECT],
  [Category.TEXT]: [MenuItem.FONT, MenuItem.TEXT_COLOR],
  [Category.BACKGROUND]: [MenuItem.BACKGROUND_COLOR],
} as const

// 메뉴: 효과
export enum Effect {
  NONE = 'none',
  BLINK = 'blink',
  PULSE = 'pulse',
  WOBBLE = 'wobble',
  SPIN = 'spin',
  SLIDE_LEFT_RIGHT = 'slideLeftRight',
  SLIDE_UP = 'slideUp',
  BOUNCE = 'bounce',
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
