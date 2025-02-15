// FONT
export enum Font {
  KKUBULIM = 'kkubulim',
  EULJIRO_ORAEORAE = 'euljiroOraeorae',
  EULJIRO_10YEARSLATER = 'euljiro10yearsLater',
  EULJIRO = 'euljiro',
  HANNA_PRO = 'hannaPro',
  HANNA_AIR = 'hannaAir',
  HANNA_11YRSOLD = 'hanna11yrsOld',
  KIRANG_HAERANG = 'kirangHaerang',
  YEONSUNG = 'yeonsung',
  DOHYEON = 'dohyeon',
  JUA = 'jua',
}

type FontInfo = {
  name: string
  src: string
  variable: `--font-${Font}`
}

const generateFontName = (key: Font): string => {
  const mapping: Record<Font, string> = {
    kkubulim: '꾸불림체',
    euljiroOraeorae: '을지로 오래오래체',
    euljiro10yearsLater: '을지로 10년후체',
    euljiro: '을지로체',
    hannaPro: '한나체 Pro',
    hannaAir: '한나체 Air',
    hanna11yrsOld: '한나는 11살체',
    kirangHaerang: '기랑해랑체',
    yeonsung: '연성체',
    dohyeon: '도현체',
    jua: '주아체',
  }
  return mapping[key]
}

const generateFontSrc = (key: Font): string => {
  const mapping: Record<Font, string> = {
    kkubulim: 'BMKkubulim.otf',
    euljiroOraeorae: 'BMEuljirooraeoraeOTF.otf',
    euljiro10yearsLater: 'BMEuljiro10yearslaterOTF.otf',
    euljiro: 'BMEULJIRO.otf',
    hannaPro: 'BMHANNAProOTF.otf',
    hannaAir: 'BMHANNAAir_otf.otf',
    hanna11yrsOld: 'BMHANNA_11yrs_otf.otf',
    kirangHaerang: 'BMKIRANGHAERANG-OTF.otf',
    yeonsung: 'BMYEONSUNG_otf.otf',
    dohyeon: 'BMDOHYEON_otf.otf',
    jua: 'BMJUA_otf.otf',
  }
  return mapping[key]
}

export const FONTS: Record<Font, FontInfo> = Object.values(Font).reduce(
  (acc, key) => {
    acc[key as Font] = {
      name: generateFontName(key),
      src: `/fonts/${generateFontSrc(key)}`,
      variable: `--font-${key}`,
    }
    return acc
  },
  {} as Record<Font, FontInfo>,
)

export const FONT_ADJUSTMENT_RATIO: Record<Font, number> = {
  kkubulim: 0,
  euljiroOraeorae: 0.5,
  euljiro10yearsLater: 0.5,
  euljiro: 0.5,
  hannaPro: 0,
  hannaAir: 0,
  hanna11yrsOld: 0,
  kirangHaerang: 0.5,
  yeonsung: 0.9,
  dohyeon: 0.7,
  jua: 0,
}

// TEXT_COLOR
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
