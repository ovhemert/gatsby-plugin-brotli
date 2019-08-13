'use strict'

const brotli = require('brotli')
const fs = require('fs')
const util = require('util')
const mkdirp = require('mkdirp')
const mkdirpAsync = util.promisify(mkdirp)
const readFileAsync = util.promisify(fs.readFile)
const writeFileAsync = util.promisify(fs.writeFile)
const path = require('path')

async function compressFile (file, pluginOptions = {}) {
  // brotli compress the asset to a new file with the .br extension
  const fileBasePath = path.join(process.cwd(), 'public')
  const srcFileName = path.join(fileBasePath, file)
  const content = await readFileAsync(srcFileName)
  const compressed = await brotli.compress(content)

  const destFilePath = (pluginOptions.path) ? path.join(fileBasePath, pluginOptions.path) : fileBasePath
  const destFileName = path.join(destFilePath, file) + '.br'
  const destFileDirname = path.dirname(destFileName)

  await mkdirpAsync(destFileDirname)
  await writeFileAsync(destFileName, compressed)
}

module.exports = compressFile
