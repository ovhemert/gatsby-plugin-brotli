'use strict'


const glob = require('glob')
const path = require('path')
const util = require('util')
const compressFile = require('./compressFile')

const defaultOptions = {
  extensions: ['css', 'js'],
  path: ''
}

const globAsync = util.promisify(glob)

async function onPostBuild (args, pluginOptions) {
  const options = { ...defaultOptions, ...pluginOptions }
  const fileBasePath = path.join(process.cwd(), 'public')
  const patternExt = (options.extensions.length > 1) ? `{${options.extensions.join(',')}}` : options.extensions[0]
  const pattern = `**/*.${patternExt}`

  const files = await globAsync(pattern, { cwd: fileBasePath, ignore: '**/*.br', nodir: true })
  const compress = files.map(file => {
    return compressFile(file, pluginOptions)
  })
  return Promise.all(compress)
}

exports.onPostBuild = onPostBuild
