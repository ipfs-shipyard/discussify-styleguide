# @discussify/styleguide

Discussify's living styleguide.


## Installation

```sh
$ npm install @discussify/styleguide
```

Be sure to import the styleguide base styles:

```css
@import "@discussify/styleguide/styles";
```

And then simply import the components and use them:

```js
import { TypingIndicator } from '@discussify/styleguide';

<TypingIndicator />
```

You may take a look at all the components by [running the Storybook](https://github.com/ipfs-shipyard/discussify-styleguide#start).

### Using the PostCSS variables and mixins

In order to use the variables and mixins, you must setup PostCSS in your application using a configuration similar to ours [`postcss.config.js`](postcss.config.js). You must adjust `importPath` to point to `node_modules/@discussify/styleguide/styles/imports`.


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
