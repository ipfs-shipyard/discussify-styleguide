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

    Activate [CSS modules](https://github.com/webpack-contrib/css-loader#modules) for this package directory (or for your whole project if you like):

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

    If you are going to use any of the CSS variables or mixins, please add `postcss-loader` after `css-loader`:

    ```js
    {
        loader: require.resolve('postcss-loader'),
        options: require('postcss-preset-moxy')({
            url: 'rebase',
        }),
    }
    ```

2. Add SVG rule

    Support inline SVGs by using `raw-loader` for this package directory (or for your whole project if you like):

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

4. Wrap your app

   Wrap your app with `KeyboardOnlyOutlines` components to disable outlines when using a pointer device, such as a mouse:

   ```js
   import { KeyboardOnlyOutlines } from '@discussify/styleguide';

   <KeyboardOnlyOutlines>
     <MyApp />
   </KeyboardOnlyOutlines>
   ```

5. Use the components

    ```js
    import { TypingIndicator } from '@discussify/styleguide';

    <TypingIndicator />
    ```

    You may take a look at all the components by [running the Storybook](https://github.com/ipfs-shipyard/discussify-styleguide#start).

    If you are using the `Modal` component, please call `Modal.setAppElement` with your app element.


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
