const fs = require('fs-extra')
const path = require('path')
const globby = require('globby')
const {
  printLog,
  pocessTypeEnum
} = require('./util')

const CONFIG = {
  OUTPUT_DIR: 'dist',
  SOURCE_DIR: 'src'
}

const DIR = {
  COMPONENT: 'components/**',
  STYLE: 'style/**',
  MIXIN: 'mixins/**',
  UTIL: 'util/**',
  // ENTER: 'index.js'
}

const appPath = process.cwd()
const sourceDir = path.join(appPath, CONFIG.SOURCE_DIR)
const outputDir = path.join(appPath, CONFIG.OUTPUT_DIR)

function build() {
  const dirArr = Object.values(DIR).map(dir => path.join(sourceDir, dir))
  const filePathArr = globby.sync(dirArr)
  try {
    filePathArr.map(filePath => {
      copyFileToDist(filePath, sourceDir, outputDir)
    })
  } catch (e) {
    console.log(e)
  }
}

function copyFileToDist(filePath, sourceDir, outputDir) {
  if (!path.isAbsolute(filePath)) {
    return
  }
  const dirname = path.dirname(filePath)
  const distDirname = dirname.replace(sourceDir, outputDir)
  const relativePath = path.relative(appPath, filePath)
  printLog(pocessTypeEnum.COPY, '发现文件', relativePath)
  fs.ensureDirSync(distDirname)
  fs.copyFileSync(filePath, path.format({
    dir: distDirname,
    base: path.basename(filePath)
  }))
}

build()