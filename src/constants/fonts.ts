export enum FontKey {
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
  variable: `--font-${FontKey}`
}

const generateFontName = (key: FontKey): string => {
  const mapping: Record<FontKey, string> = {
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

const generateFontSrc = (key: FontKey): string => {
  const mapping: Record<FontKey, string> = {
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
