const path = require('path')
const chalk = require('chalk')

const pocessTypeEnum = {
  CREATE: 'create',
  COMPILE: 'compile',
  CONVERT: 'convert',
  COPY: 'copy',
  GENERATE: 'generate',
  MODIFY: 'modify',
  ERROR: 'error',
  WARNING: 'warning',
  UNLINK: 'unlink',
  REFERENCE: 'reference'
}

const processTypeMap = {
  [pocessTypeEnum.CREATE]: {
    name: '创建',
    color: 'cyan'
  },
  [pocessTypeEnum.COMPILE]: {
    name: '编译',
    color: 'green'
  },
  [pocessTypeEnum.CONVERT]: {
    name: '转换',
    color: chalk.rgb(255, 136, 0)
  },
  [pocessTypeEnum.COPY]: {
    name: '拷贝',
    color: 'magenta'
  },
  [pocessTypeEnum.GENERATE]: {
    name: '生成',
    color: 'blue'
  },
  [pocessTypeEnum.MODIFY]: {
    name: '修改',
    color: 'yellow'
  },
  [pocessTypeEnum.ERROR]: {
    name: '错误',
    color: 'red'
  },
  [pocessTypeEnum.WARNING]: {
    name: '警告',
    color: 'yellow'
  },
  [pocessTypeEnum.UNLINK]: {
    name: '删除',
    color: 'magenta'
  },
  [pocessTypeEnum.START]: {
    name: '启动',
    color: 'green'
  },
  [pocessTypeEnum.REFERENCE]: {
    name: '引用',
    color: 'blue'
  }
}

function resolve(...args) {
  return path.resolve(__dirname, '../', ...args)
}

function printLog(type, tag, filePath) {
  const typeShow = processTypeMap[type]
  const tagLen = tag.replace(/[\u0391-\uFFE5]/g, 'aa').length
  const tagFormatLen = 8
  if (tagLen < tagFormatLen) {
    const rightPadding = new Array(tagFormatLen - tagLen + 1).join(' ')
    tag += rightPadding
  }
  const padding = ''
  filePath = filePath || ''
  if (typeof typeShow.color === 'string') {
    console.log(chalk[typeShow.color](typeShow.name), padding, tag, padding, filePath)
  } else {
    console.log(typeShow.color(typeShow.name), padding, tag, padding, filePath)
  }
}

module.exports = {
  resolve,
  printLog,
  pocessTypeEnum
}