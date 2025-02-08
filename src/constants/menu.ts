export enum Category {
  TYPE = 'type',
  TEXT = 'text',
  BACKGROUND = 'background',
}

export enum SubCategory {
  FONT_SIZE = 'fontSize',
  TEXT_EFFECT = 'textEffect',
  FONT_FAMILY = 'fontFamily',
  TEXT_COLOR = 'textColor',
  BACKGROUND_COLOR = 'backgroundColor',
  BACKGROUND_THEME = 'backgroundTheme',
}

interface ItemInfo {
  key: Category | SubCategory
  name: string
}

export const CATEGORY: Record<Category, ItemInfo> = {
  [Category.TYPE]: {
    key: Category.TYPE,
    name: '이펙트',
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

export const SUB_CATEGORY: Record<SubCategory, ItemInfo> = {
  [SubCategory.FONT_SIZE]: {
    key: SubCategory.FONT_SIZE,
    name: '크기',
  },
  [SubCategory.TEXT_EFFECT]: {
    key: SubCategory.TEXT_EFFECT,
    name: '효과',
  },
  [SubCategory.FONT_FAMILY]: {
    key: SubCategory.FONT_FAMILY,
    name: '폰트',
  },
  [SubCategory.TEXT_COLOR]: {
    key: SubCategory.TEXT_COLOR,
    name: '글자색',
  },
  [SubCategory.BACKGROUND_COLOR]: {
    key: SubCategory.BACKGROUND_COLOR,
    name: '배경색',
  },
  [SubCategory.BACKGROUND_THEME]: {
    key: SubCategory.BACKGROUND_THEME,
    name: '테마',
  },
}

export const MENU_MAP = {
  [Category.TYPE]: [SubCategory.FONT_SIZE, SubCategory.TEXT_EFFECT],
  [Category.TEXT]: [SubCategory.FONT_FAMILY, SubCategory.TEXT_COLOR],
  [Category.BACKGROUND]: [
    SubCategory.BACKGROUND_COLOR,
    SubCategory.BACKGROUND_THEME,
  ],
} as const
