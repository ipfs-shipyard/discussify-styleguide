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

## Using a linked version of [@discussify-styleguide](https://github.com/ipfs-shipyard/discussify-styleguide)

In some cases, you may want to make changes to Discussify's styleguide at the same time as you work on your project which uses the styleguide. In order to use a local version of [@discussify-styleguide](https://github.com/ipfs-shipyard/discussify-styleguide) and have any styleguide modifications be reflected live on your project, some pages have to be made in our main project.

### Install `postcss-import-webpack-resolver`

Run the following command in your main project

```sh
$ npm i postcss-import-webpack-resolver
```

### Update `postcss-preset-moxy` to the latest version

In `package.json` replace the version of the `postcss-preset-moxy` dependency to be equal to or above `^3.0.0`.

### Make required changes in `webpack.js`.

Add two new dependencies. `fs` will be used to check if the styleguide's version is linked or normally installed and `postcss-import-webpack-resolver` will allow the creation of aliases in postcss.

```js
const fs = require('fs');
const createResolver = require('postcss-import-webpack-resolver');
```

Inside `buildConfig`, before the `return` line, add the following block. This will check that there is a linked version of `discussify-styleguide`

```js
const existsStyleguideSrc = fs.existsSync(path.join(projectDir, 'node_modules/@discussify/styleguide/src'));
```

#### In the returned object

In the `resolve` attribute, add the following attribute to the object. Create an alias so that your project will resolve the `import`s to the styleguide in the package's `src/` instead of `dist/`. This will allow your project to update when changes occur to `js` files in the styleguide, without requiring a new styleguide build.

```js
// In dev, we want to compile the styleguide when linked
alias: isDev && existsStyleguideSrc ? {
    '@discussify/styleguide': path.join(projectDir, 'node_modules/@discussify/styleguide/src'),
} : undefined,
```

Inside the object passed to `require('postcss-preset-moxy)()`, replace the `url` attribute with the two following attributes. The new `url` attribute will inline all resources included from CSS files, while the new `import` attribute will create a new alias for the `styles` folder in the styleguide's `src/` directory. This will have a similar effect as the previous bit of code, but for CSS imports.

```js
url: [
    { filter: /.woff$/, url: ({ pathname }) => `https://${path.basename(pathname)}}` },
    { filter: /.*/, url: 'inline' },
],
import: {
    // In dev, we want to compile the styleguide when linked
    resolve: createResolver({
        alias: isDev && existsStyleguideSrc ? {
            '@discussify/styleguide/styles': path.join(projectDir, 'node_modules/@discussify/styleguide/src/styles'), // eslint-disable-line max-len
            } : undefined,
        }),
},
```


### Link `discussify-styleguide` to your main project.

Link the projects by running `npm link` inside the root directory of the `discussify-styleguide` project, then run `npm link @discussify/styleguide` inside your main project. NOTE: this step has to be retaken every time you run an `npm i` command in your main project, because `npm i` will replace your linked version with an installed version.


## Contributing

If you want to contribute for the project, we encourage you to read over the [discussify](https://github.com/ipfs-shipyard/discussify) repository README.
