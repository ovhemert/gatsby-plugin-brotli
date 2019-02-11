# gatsby-plugin-brotli

[![Travis](https://img.shields.io/travis/com/ovhemert/gatsby-plugin-brotli.svg?branch=master&logo=travis)](https://travis-ci.com/ovhemert/gatsby-plugin-brotli)
[![AppVeyor](https://img.shields.io/appveyor/ci/ovhemert/gatsby-plugin-brotli.svg?logo=appveyor)](https://ci.appveyor.com/project/ovhemert/gatsby-plugin-brotli)
[![Known Vulnerabilities](https://snyk.io/test/npm/gatsby-plugin-brotli/badge.svg)](https://snyk.io/test/npm/gatsby-plugin-brotli)
[![Greenkeeper badge](https://badges.greenkeeper.io/ovhemert/gatsby-plugin-brotli.svg)](https://greenkeeper.io/)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](http://standardjs.com/)

Gatsby plugin for preparing brotli-compressed versions of assets.

```bash
/webpack-runtime-cde5506958f1afc4d89e.js
```
becomes
```bash
/webpack-runtime-cde5506958f1afc4d89e.js.br
```

## Installation

With npm:

```bash
npm install --save gatsby-plugin-brotli
```

Or with Yarn:

```bash
yarn add gatsby-plugin-brotli
```

## Usage

In your `gatsby-config.js` file add:

```javascript
module.exports = {
  plugins: [
    {
      resolve: 'gatsby-plugin-brotli'
    }
  ]
}
```

## Maintainers

Osmond van Hemert
[![Github](https://img.shields.io/badge/style-github-333333.svg?logo=github&logoColor=white&label=)](https://github.com/ovhemert/about)
[![Web](https://img.shields.io/badge/style-website-333333.svg?logoColor=white&label=&logo=diaspora)](https://www.osmondvanhemert.nl)

## Contributing

See the [CONTRIBUTING.md](./docs/CONTRIBUTING.md) file for details.

## License

Licensed under [MIT](./LICENSE).

_NOTE: This plugin only generates output when run in `production` mode! To test, run: `gatsby build && gatsby serve`_
