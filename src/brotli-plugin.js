'use strict'

const fs = require('fs')
const path = require('path')
const util = require('util')
const brotli = require('brotli')

let assetsCompress = {}

class WebpackPlugin {
  constructor (options) {
    this.options = options
  }
  afterOptimizeAssets (assets) {
    Object.keys(assets).forEach(file => {
      if (file.endsWith('.css') || file.endsWith('.js')) {
        assetsCompress[`/${file}`] = {}
      }
    })
  }
  afterPlugins (compiler) {
    compiler.hooks.thisCompilation.tap('PluginBrotli', this.thisCompilation.bind(this))
  }
  apply (compiler) {
    compiler.hooks.afterPlugins.tap('PluginBrotli', this.afterPlugins.bind(this))
  }
  thisCompilation (compilation) {
    compilation.hooks.afterOptimizeAssets.tap('PluginBrotli', this.afterOptimizeAssets.bind(this))
  }
}

async function compressFile (file, pluginOptions = {}) {
  // brotli compress the asset to a new file with the .br extension
  const readFileAsync = util.promisify(fs.readFile)
  const writeFileAsync = util.promisify(fs.writeFile)

  const fileBasePath = path.join(process.cwd(), 'public')
  const srcFileName = path.join(fileBasePath, file)
  const content = await readFileAsync(srcFileName)
  const compressed = await brotli.compress(content)

  const destFilePath = (pluginOptions.path) ? path.join(fileBasePath, pluginOptions.path) : fileBasePath
  const destFileName = path.join(destFilePath, file) + '.br'

  if (!fs.existsSync(destFilePath)) {
    const mkdirAsync = util.promisify(fs.mkdir)
    await mkdirAsync(destFilePath)
  }

  await writeFileAsync(destFileName, compressed)
}

function onPostBuild (args, pluginOptions) {
  // after asset files have been generated, compress them
  const compress = Object.keys(assetsCompress).map(file => {
    return compressFile(file, pluginOptions)
  })
  return Promise.all(compress)
}

module.exports.WebpackPlugin = WebpackPlugin
module.exports.onPostBuild = onPostBuild
