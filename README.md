# @discussify/styleguide

Discussify's living styleguide.


## Installation

```sh
$ npm install @discussify/styleguide
```

### Setup

It's assumed that you will consume this package in an application bundled with Webpack.
Follow the steps below:

1. Activate CSS modules

    Activate [CSS modules](https://github.com/webpack-contrib/css-loader#modules) for this package directory (or for your whole project):

    ```js
    {
        test: /\.css$/,
        include: path.resolve(__dirname, 'node_modules/@discussify/styleguide'),
        loader: [
            {
                loader: require.resolve('style-loader'),
            },
            {
                loader: require.resolve('css-loader'),
                options: {
                    modules: true,
                    sourceMap: true,
                    importLoaders: 1,
                    localIdentName: '[name]__[local]___[hash:base64:5]!',
                },
            },
        ],
    },
    ```

2. Add SVG rule

    Support inline SVGs by using `raw-loader` (with a few tweaks):

    ```js
    {
        test: /\.svg$/,
        include: path.resolve(__dirname, 'node_modules/@discussify/styleguide'),
        use: [
            require.resolve('raw-loader'),
            {
                loader: require.resolve('svgo-loader'),
                options: {
                    plugins: [
                        { removeTitle: true },
                        { removeDimensions: true },
                        { cleanupIDs: false },
                    ],
                },
            },
            // Uniquify classnames and ids so they don't conflict with each other
            {
                loader: require.resolve('svg-css-modules-loader'),
                options: {
                    transformId: true,
                },
            },
        ],
    },
    ```

    Alternatively, you may setup [`external-svg-sprite-loader`](https://github.com/karify/external-svg-sprite-loader) for performance reasons. Check out this project storybook [webpack config](.storybook/webpack.config.js) for an example.

3. Import base styles

    Import the styleguide base styles in the app's entry CSS file:

    ```css
    /* src/index.css */
    @import "@discussify/styleguide/styles";
    ```

    ..or in your entry JavaScript file:

    ```js
    // src/index.js
    import "@discussify/styleguide/styles/index.css";
    ```

4. Use the components

    ```js
    import { TypingIndicator } from '@discussify/styleguide';

    <TypingIndicator />
    ```

    You may take a look at all the components by [running the Storybook](https://github.com/ipfs-shipyard/discussify-styleguide#start).


## Base technology

- React
- CSS modules
- [PostCSS](https://github.com/postcss/postcss) with [MOXY's preset](https://github.com/moxystudio/postcss-preset-moxy)
- SVG spriting support with [external-svg-sprite-loader](https://github.com/karify/external-svg-sprite-loader)


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
