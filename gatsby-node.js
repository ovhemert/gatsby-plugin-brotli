'use strict'

const defaultOptions = {
  extensions: ['css', 'js']
}

const PluginBrotli = require('./src/brotli-plugin')

exports.onCreateWebpackConfig = ({ stage, getConfig, rules, loaders, actions }, pluginOptions) => {
  const options = {
    ...defaultOptions,
    ...pluginOptions
  }
  if (stage === 'build-javascript') {
    actions.setWebpackConfig({
      plugins: [
        new PluginBrotli.WebpackPlugin(options)
      ]
    })
  }
}

exports.onPostBuild = PluginBrotli.onPostBuild
