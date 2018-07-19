# @discussify/styleguide

Discussify's living styleguide.

## Base technology

- React
- CSS modules
- [PostCSS](https://github.com/postcss/postcss) with [MOXY's preset](https://github.com/moxystudio/postcss-preset-moxy)
- SVG spriting with [external-svg-sprite-loader](https://github.com/karify/external-svg-sprite-loader)

## Commands

### start

```sh
$ npm start
```

Starts [Storybook](https://storybook.js.org/).

### build

```sh
$ npm run build
```

Builds the project.

### test

```sh
$ npm test
```

Runs the project tests.

### lint

```sh
$ npm run lint
```

Checks if the project has any linting errors.

### release

```sh
$ npm run release
```

Releases and publishes the package. Runs tests, lints and builds the project beforehand.

This command uses [`standard-version`](https://github.com/conventional-changelog/standard-version) underneath. The version is automatically inferred from the [conventional commits](https://conventionalcommits.org/).


## Contributing

If you want to contribute for the project, we encourage you to read over the [discussify](https://github.com/ipfs-shipyard/discussify) repository README.
