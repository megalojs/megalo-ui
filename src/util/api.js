import {
  isWEAPP,
  isWEB,
  isSWAN,
  isALIPAY,
  isTT
} from './env'

let platform = ''

if (isWEAPP) {
  platform = 'wechat'
} else if (isWEB) {
  platform = 'h5'
} else if (isSWAN) {
  platform = 'swan'
} else if (isALIPAY) {
  platform = 'alipay'
} else if (isTT) {
  platform = 'tt'
}

const Megalo = require(`@megalo/api/platforms/${platform}`).default

export {
  Megalo
}