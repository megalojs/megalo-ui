export const ENV_TYPE = {
  WEAPP: 'WEAPP',
  WEB: 'WEB',
  SWAN: 'SWAN',
  ALIPAY: 'ALIPAY',
  TT: 'TT'
}

export function getEnv () {
  if (typeof wx !== 'undefined' && wx.getSystemInfo) {
    return ENV_TYPE.WEAPP
  }
  if (typeof swan !== 'undefined' && swan.getSystemInfo) {
    return ENV_TYPE.SWAN
  }
  if (typeof my !== 'undefined' && my.getSystemInfo) {
    return ENV_TYPE.ALIPAY
  }
  if (typeof tt !== 'undefined' && tt.getSystemInfo) {
    return ENV_TYPE.TT
  }
  if (typeof window !== 'undefined') {
    return ENV_TYPE.WEB
  }
  return 'Unknown environment'
}

const currentEnv = getEnv();

export const isWEAPP = currentEnv === ENV_TYPE.WEAPP
export const isALIPAY = currentEnv === ENV_TYPE.ALIPAY
export const isSWAN = currentEnv === ENV_TYPE.SWAN
export const isWEB = currentEnv === ENV_TYPE.WEB
export const isTT = currentEnv === ENV_TYPE.TT

export const isMINIAPP = (isWEAPP || isALIPAY || isSWAN || isTT)