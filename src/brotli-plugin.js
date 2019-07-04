'use strict'

const brotli = require('brotli')
const fs = require('fs')
const glob = require('glob')
const mkdirp = require('mkdirp')
const path = require('path')
const util = require('util')

const defaultOptions = {
  extensions: ['css', 'js'],
  path: ''
}

const globAsync = util.promisify(glob)
const mkdirpAsync = util.promisify(mkdirp)
const readFileAsync = util.promisify(fs.readFile)
const writeFileAsync = util.promisify(fs.writeFile)

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

async function onPostBuild (args, pluginOptions) {
  const options = { ...defaultOptions, ...pluginOptions }
  const fileBasePath = path.join(process.cwd(), 'public')
  const patternExt = (options.extensions.length > 1) ? `${options.extensions.join(',')}` : options.extensions[0]
  const pattern = `**/*.${patternExt}`

  const files = await globAsync(pattern, { cwd: fileBasePath, ignore: '**/*.br' })
  const compress = files.map(file => {
    return compressFile(file, pluginOptions)
  })
  return Promise.all(compress)
}

exports.onPostBuild = onPostBuild
