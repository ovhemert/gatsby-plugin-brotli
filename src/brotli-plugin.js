'use strict'

const glob = require('glob')
const path = require('path')
const util = require('util')

const Piscina = require('piscina')

const defaultOptions = {
  cwd: path.join(process.cwd(), 'public'),
  extensions: ['css', 'js'],
  path: ''
}

const globAsync = util.promisify(glob)

async function onPostBuild ({ reporter }, pluginOptions) {
  const options = { ...defaultOptions, ...pluginOptions }

  // get the files
  const patternExt = (options.extensions.length > 1) ? `{${options.extensions.join(',')}}` : options.extensions[0]
  const pattern = `**/*.${patternExt}`
  const globResult = await globAsync(pattern, { cwd: options.cwd, ignore: '**/*.br', nodir: true })
  const files = globResult.map(res => {
    return {
      from: path.join(options.cwd, res),
      to: path.join(options.cwd, options.path, `${res}.br`)
    }
  })

  // compress using worker pool
  const pool = new Piscina({ filename: path.resolve(__dirname, 'worker.js') })
  const compress = files.map(file => pool.runTask(file))
  await Promise.all(compress)

  reporter.info(`Brotli compressed ${pool.completed} files - ${(pool.duration / 1000).toFixed(3)}s - ${(pool.runTime.average / 1000).toFixed(3)}/s`)
}

exports.onPostBuild = onPostBuild
