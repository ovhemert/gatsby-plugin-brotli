# gatsby-plugin-brotli

[![CI](https://github.com/ovhemert/gatsby-plugin-brotli/workflows/CI/badge.svg)](https://github.com/ovhemert/gatsby-plugin-brotli/actions)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/87a2946ec87e42869eb37cc731aee4e1)](https://www.codacy.com/app/ovhemert/gatsby-plugin-brotli?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=ovhemert/gatsby-plugin-brotli&amp;utm_campaign=Badge_Grade)
[![Known Vulnerabilities](https://snyk.io/test/npm/gatsby-plugin-brotli/badge.svg)](https://snyk.io/test/npm/gatsby-plugin-brotli)
[![Coverage Status](https://coveralls.io/repos/github/ovhemert/gatsby-plugin-brotli/badge.svg)](https://coveralls.io/github/ovhemert/gatsby-plugin-brotli)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](http://standardjs.com/)

Gatsby plugin for preparing brotli-compressed versions of assets.

```bash
/webpack-runtime-cde5506958f1afc4d89e.js
```
becomes
```bash
/webpack-runtime-cde5506958f1afc4d89e.js.br
```

## Requirements

This plugin will only generate the compressed files. To see them been served to the client, your Gatsby website should run on a production server that supports Brotli .br-files. The Gatsby development server **does not** serve the compressed versions.

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

By default, only `.css` and `.js` files are compressed, but you can override this with the `extensions` option.

```javascript
module.exports = {
  plugins: [
    {
      resolve: 'gatsby-plugin-brotli',
      options: {
        extensions: ['css', 'html', 'js', 'svg']
      }
    }
  ]
}
```

You can even place all the brotli-compressed files (only the brotli ones, the uncompressed ones will
be saved in the `public` directory as usual) in a dedicated directory (ex. `public/brotli`):

```javascript
module.exports = {
  plugins: [
    {
      resolve: 'gatsby-plugin-brotli',
      options: {
        path: 'brotli'
      }
    }
  ]
}
```

## Maintainers

Osmond van Hemert
[![Github](https://img.shields.io/badge/-website.svg?style=social&logoColor=333&logo=github)](https://github.com/ovhemert)
[![Web](https://img.shields.io/badge/-website.svg?style=social&logoColor=333&logo=nextdoor)](https://ovhemert.dev)

## Contributing

If you would like to help out with some code, check the [details](./.github/CONTRIBUTING.md).

Not a coder, but still want to support? Have a look at the options available to [donate](https://ovhemert.dev/donate).

## Sponsors

[![BrowserStack](./docs/assets/browserstack-logo.svg)](https://www.browserstack.com/)

## License

Licensed under [MIT](./LICENSE).

_NOTE: This plugin only generates output when run in `production` mode! To test, run: `gatsby build && gatsby serve`_
