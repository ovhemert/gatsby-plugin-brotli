'use strict'

const brotliPlugin = require('./src/brotli-plugin')

exports.onPostBuild = brotliPlugin.onPostBuild
