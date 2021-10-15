'use strict'

const fs = require('fs')
const mkdirp = require('mkdirp')
const path = require('path')
const { pipeline } = require('stream')
const util = require('util')
const zlib = require('zlib')

const pipelineAsync = util.promisify(pipeline)

async function brotliCompressFile (from, to) {
  const toDir = path.dirname(to)
  await mkdirp(toDir)
  await pipelineAsync(
    fs.createReadStream(from),
    zlib.createBrotliCompress({
      params: {
        [zlib.constants.BROTLI_PARAM_QUALITY]: zlib.constants.BROTLI_MAX_QUALITY,
        [zlib.constants.BROTLI_PARAM_SIZE_HINT]: fs.statSync(from).size
      }
    }),
    fs.createWriteStream(to)
  )
}

module.exports = async function ({ from, to }) {
  return brotliCompressFile(from, to)
}
