# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

Changes are grouped by:
`Added` for new features
`Changed` for changes in existing functionality
`Deprecated` for soon-to-be removed features
`Removed` for now removed features
`Fixed` for any bug fixes
`Security` in case of vulnerabilities

## [Unreleased](https://github.com/ovhemert/gatsby-plugin-brotli/compare/v2.1.0...HEAD)

...

## [2.0.0](https://github.com/ovhemert/gatsby-plugin-brotli/compare/v1.3.1...v2.0.0) - 2020-07-30

### Added

- Node v14.x support by [@ovhemert](https://github.com/ovhemert)
- Tests and full code coverage by [@ovhemert](https://github.com/ovhemert)

### Changed

- Replaced worker farm with Node.js built-in worker threads by [@ovhemert](https://github.com/ovhemert)
- Replaced brotli compression module with Node.js built-in functions by [@ovhemert](https://github.com/ovhemert)

### Removed

- Node v10.x support by [@ovhemert](https://github.com/ovhemert)

## [1.3.1](https://github.com/ovhemert/gatsby-plugin-brotli/compare/v1.2.4...v1.3.1) - 2019-11-19

### Added

- Worker farm to speed up compression in parallel by [@AG-Teammate](https://github.com/AG-Teammate)

### Security

- Update dependencies to prevent vulnerability issues by [@ovhemert](https://github.com/ovhemert)

## [1.2.4](https://github.com/ovhemert/gatsby-plugin-brotli/compare/v1.1.2...v1.2.4) - 2019-08-04

### Fixed

- Passing in single extension issue fix by [@ovhemert](https://github.com/ovhemert)

### Security

- Update dependencies to prevent vulnerability issues by [@ovhemert](https://github.com/ovhemert)

## [1.1.2](https://github.com/ovhemert/gatsby-plugin-brotli/compare/v1.0.1...v1.1.2) - 2019-06-10

### Added

- Option to put compressed files in a dedicated directory by [@NoriSte](https://github.com/NoriSte)

### Security

- Update dependencies to prevent vulnerability issues by [@ovhemert](https://github.com/ovhemert)

## [1.0.1](https://github.com/ovhemert/gatsby-plugin-brotli/releases/tag/v1.0.1) - 2019-02-28

- Initial version by [@ovhemert](https://github.com/ovhemert)
