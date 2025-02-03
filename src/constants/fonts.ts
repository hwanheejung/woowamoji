export enum FontKey {
  KKUBULIM = 'kkubulim',
  EULJIRO_ORAEORAE = 'euljiro-oraeorae',
  EULJIRO_10YEARSLATER = 'euljiro-10yearslater',
  EULJIRO = 'euljiro',
  HANNA_PRO = 'hanna-pro',
  HANNA_AIR = 'hanna-air',
  HANNA_11YRSOLD = 'hanna-11yrsold',
  KIRANG_HAERANG = 'kirang-haerang',
  YEONSUNG = 'yeonsung',
  DOHYEON = 'dohyeon',
  JUA = 'jua',
}

type FontInfo = {
  name: string
  src: string
  variable: `--font-${FontKey}`
}

const generateFontName = (key: FontKey): string => {
  const mapping: Record<FontKey, string> = {
    kkubulim: '꾸불림체',
    'euljiro-oraeorae': '을지로 오래오래체',
    'euljiro-10yearslater': '을지로 10년후체',
    euljiro: '을지로체',
    'hanna-pro': '한나체 Pro',
    'hanna-air': '한나체 Air',
    'hanna-11yrsold': '한나는 11살체',
    'kirang-haerang': '기랑해랑체',
    yeonsung: '연성체',
    dohyeon: '도현체',
    jua: '주아체',
  }
  return mapping[key]
}

const generateFontSrc = (key: FontKey): string => {
  const mapping: Record<FontKey, string> = {
    kkubulim: 'BMKkubulim.otf',
    'euljiro-oraeorae': 'BMEuljirooraeoraeOTF.otf',
    'euljiro-10yearslater': 'BMEuljiro10yearslaterOTF.otf',
    euljiro: 'BMEULJIRO.otf',
    'hanna-pro': 'BMHANNAProOTF.otf',
    'hanna-air': 'BMHANNAAir_otf.otf',
    'hanna-11yrsold': 'BMHANNA_11yrs_otf.otf',
    'kirang-haerang': 'BMKIRANGHAERANG-OTF.otf',
    yeonsung: 'BMYEONSUNG_otf.otf',
    dohyeon: 'BMDOHYEON_otf.otf',
    jua: 'BMJUA_otf.otf',
  }
  return mapping[key]
}

export const FONTS: Record<FontKey, FontInfo> = Object.values(FontKey).reduce(
  (acc, key) => {
    acc[key as FontKey] = {
      name: generateFontName(key),
      src: `/fonts/${generateFontSrc(key)}`,
      variable: `--font-${key}`,
    }
    return acc
  },
  {} as Record<FontKey, FontInfo>,
)
