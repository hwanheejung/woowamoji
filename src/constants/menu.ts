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
  SLIDE_LEFT_RIGHT = 'slideLeftRight',
  SLIDE_UP = 'slideUp',
  BOUNCE = 'bounce',
  PULSE_SCALE = 'pulseScale',
  ROTATE_LOOP = 'rotateLoop',
}
