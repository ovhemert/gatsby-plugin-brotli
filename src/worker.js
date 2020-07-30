'use strict'

const fs = require('fs')
const mkdirp = require('mkdirp')
const path = require('path')
const { pipeline } = require('stream')
const util = require('util')
const zlib = require('zlib')

const pipelineAsync = util.promisify(pipeline)

module.exports = async function ({ file, options = {} }) {
  // brotli compress the asset to a new file with the .br extension

  const fileBasePath = path.join(process.cwd(), 'public')
  const srcFileName = path.join(fileBasePath, file)
  const destFilePath = (options.path) ? path.join(fileBasePath, options.path) : fileBasePath
  const destFileName = path.join(destFilePath, file) + '.br'
  const destFileDirname = path.dirname(destFileName)

  await mkdirp(destFileDirname)
  await pipelineAsync(
    fs.createReadStream(srcFileName),
    zlib.createBrotliCompress(),
    fs.createWriteStream(destFileName)
  )
}
