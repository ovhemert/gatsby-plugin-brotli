'use strict'
const watcher = require('@parcel/watcher')

// const glob = require('glob')
const minimatch = require('minimatch')
const path = require('path')
const fs = require('fs')

const Piscina = require('piscina')

const defaultOptions = {
  cwd: path.join(process.cwd(), 'public'),
  extensions: ['css', 'js'],
  path: ''
}


// const globAsync = util.promisify(glob)

async function onPostBuild ({ reporter }, pluginOptions) {
  const options = { ...defaultOptions, ...pluginOptions }

  // get the files
  const patternExt = (options.extensions.length > 1) ? `{${options.extensions.join(',')}}` : options.extensions[0]
  const pattern = `**/*.${patternExt}`
  const events = await watcher.getEventsSince(options.cwd, snapshotPath)
  fs.unlinkSync(snapshotPath)
  const removed = events.filter(e => e.type === `delete` && minimatch(e.path, pattern) && !minimatch(e.path, `**/*.br`)).map(e => `${e.path}.br`)
  removed.forEach(path => {
    fs.unlinkSync(path)
  })
  const paths = events.filter(e => (e.type === `create` || e.type === `update`) && minimatch(e.path, pattern) && !minimatch(e.path, `**/*.br`)).map(e => e.path)
  const files = paths.map(res => {
    let name = path.relative(options.cwd, res)
    return {
      from: res,
      to: path.join(options.cwd, options.path, `${name}.br`)
    }
  })

  // compress using worker pool
  const pool = new Piscina({ filename: path.resolve(__dirname, 'worker.js') })
  const compress = files.map(file => pool.runTask(file))
  await Promise.all(compress)

  reporter.info(`Brotli compressed ${pool.completed} files - ${(pool.duration / 1000).toFixed(3)}s - ${(pool.runTime.average / 1000).toFixed(3)}/s`)
}

async function onPreBuild ({ reporter }, pluginOptions) {
  const options = { ...defaultOptions, ...pluginOptions }

  await watcher.writeSnapshot(options.cwd, snapshotPath)
}


const snapshotPath = ".gatsby-plugin-brotli-snapshot.txt"

exports.onPostBuild = onPostBuild
exports.onPreBuild = onPreBuild
