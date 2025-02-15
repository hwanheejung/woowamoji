export enum TextEffect {
  NONE = 'none',
  BLINK = 'blink',
  PULSE = 'pulse',
  WOBBLE = 'wobble',
  SPIN = 'spin',
  FLOAT = 'float',
  SHAKE = 'shake',
  BOUNCE = 'bounce',
  ONE_BY_ONE = 'oneByOne', // 한글자씩 나타남
  SLIDEX = 'slideX',
}

export const EFFECT_SETTINGS: Record<TextEffect, any> = {
  [TextEffect.NONE]: {},
  [TextEffect.BLINK]: {
    FRAME_COUNT: 2,
    FRAME_INTERVAL: 500,
  },
  [TextEffect.PULSE]: (() => {
    const FRAME_COUNT = 15
    const DURATION = 1200
    return {
      FRAME_COUNT,
      FRAME_INTERVAL: DURATION / FRAME_COUNT,
      MIN_SCALE: 0.8,
      MAX_SCALE: 1.2,
    }
  })(),
  [TextEffect.WOBBLE]: (() => {
    const FRAME_COUNT = 15
    const DURATION = 1200
    return {
      FRAME_COUNT,
      FRAME_INTERVAL: DURATION / FRAME_COUNT,
      MIN_ROTATION: -10,
      MAX_ROTATION: 10,
    }
  })(),
  [TextEffect.SPIN]: (() => {
    const FRAME_COUNT = 28
    const DURATION = 1200
    return {
      FRAME_COUNT,
      FRAME_INTERVAL: DURATION / FRAME_COUNT,
      FULL_ROTATION: 360,
    }
  })(),
  [TextEffect.FLOAT]: (() => {
    const FRAME_COUNT = 25
    const DURATION = 1400
    return {
      FRAME_COUNT,
      FRAME_INTERVAL: DURATION / FRAME_COUNT,
      FLOAT_RANGE_RATIO: 0.25,
    }
  })(),
  [TextEffect.SHAKE]: {
    FRAME_COUNT: 15,
    FRAME_INTERVAL: 25,
    SHAKE_INTENSITY: 2,
  },
  [TextEffect.BOUNCE]: {
    FRAME_COUNT: 15,
    FRAME_INTERVAL: 50,
    BOUNCE_HEIGHT_RATIO: 0.5,
  },
  [TextEffect.ONE_BY_ONE]: {
    FRAME_INTERVAL: 400,
    MAX_FRAME_COUNT: 15,
  },
  [TextEffect.SLIDEX]: {
    FRAME_INTERVAL: 50,
    JUMP: 5,
  },
}
