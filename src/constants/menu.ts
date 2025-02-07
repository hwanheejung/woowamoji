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

// 메뉴: 텍스트 색상
export enum TextColor {
  BLACK = 'black',
  WHITE = 'white',
  RED = 'red',
  ORANGE = 'orange',
  YELLOW = 'yellow',
  GREEN = 'green',
  BLUE = 'blue',
  PURPLE = 'purple',
  PINK = 'pink',
  GRAY = 'gray',
  BROWN = 'brown',
}

export const TEXT_COLOR = {
  [TextColor.BLACK]: {
    key: TextColor.BLACK,
    name: '검정색',
    color: '#000000',
  },
  [TextColor.WHITE]: {
    key: TextColor.WHITE,
    name: '흰색',
    color: '#ffffff',
  },
  [TextColor.RED]: {
    key: TextColor.RED,
    name: '빨간색',
    color: '#ff0000',
  },
  [TextColor.ORANGE]: {
    key: TextColor.ORANGE,
    name: '주황색',
    color: '#ffa500',
  },
  [TextColor.YELLOW]: {
    key: TextColor.YELLOW,
    name: '노란색',
    color: '#ffff00',
  },
  [TextColor.GREEN]: {
    key: TextColor.GREEN,
    name: '초록색',
    color: '#008000',
  },
  [TextColor.BLUE]: {
    key: TextColor.BLUE,
    name: '파란색',
    color: '#0000ff',
  },
  [TextColor.PURPLE]: {
    key: TextColor.PURPLE,
    name: '보라색',
    color: '#800080',
  },
  [TextColor.PINK]: {
    key: TextColor.PINK,
    name: '분홍색',
    color: '#ffc0cb',
  },
  [TextColor.GRAY]: {
    key: TextColor.GRAY,
    name: '회색',
    color: '#808080',
  },
  [TextColor.BROWN]: {
    key: TextColor.BROWN,
    name: '갈색',
    color: '#a52a2a',
  },
} as const
