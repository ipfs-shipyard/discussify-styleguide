const path = require('path');
const SvgStorePlugin = require('external-svg-sprite-loader/lib/SvgStorePlugin');

module.exports = (storybookBaseConfig, configType) => {
    // CSS files loader which enables the use of postcss
    storybookBaseConfig.module.rules.push({
        test: /\.css$/,
        loader: [
            {
                // Extract CSS files if we are not in development mode
                loader: 'style-loader',
                options: {
                    convertToAbsoluteUrls: true,
                },
            },
            {
                loader: 'css-loader',
                options: {
                    modules: true,
                    sourceMap: true,
                    importLoaders: 1,
                    camelCase: 'dashes',
                    localIdentName: '[name]__[local]___[hash:base64:5]!',
                },
            },
            {
                loader: 'postcss-loader',
                options: require('postcss-preset-moxy')({
                    // Any non-relative imports are resolved to this path
                    importPath: path.join(__dirname, '../src/styles/imports'),
                }),
            },
        ],
    });

    // Load SVG files and create an external sprite
    // While this has a lot of advantages such as not blocking the initial load,
    // it might not workout for every SVG, see: https://github.com/moxystudio/react-with-moxy/issues/6
    storybookBaseConfig.module.rules.push({
        test: /\.svg$/,
        exclude: [/\.inline\.svg$/, path.join(__dirname, '../src/media/fonts')],
        use: [
            {
                loader: 'external-svg-sprite-loader',
                options: {
                    name: 'images/svg-sprite.svg',
                },
            },
            // Uniquify classnames and ids so that if svgxuse injects the sprite into the body,
            // it doesn't cause DOM conflicts
            {
                loader: 'svg-css-modules-loader',
                options: {
                    transformId: true,
                },
            },
        ],
    });
    storybookBaseConfig.plugins.push(new SvgStorePlugin());

    // Support inline svgs, see explanation above
    storybookBaseConfig.module.rules.push({
        test: /\.inline\.svg$/,
        use: [
            'raw-loader',
            {
                loader: 'svgo-loader',
                options: {
                    plugins: [
                        { removeTitle: true },
                        { removeDimensions: true },
                        { cleanupIDs: false },
                    ],
                },
            },
            // Uniquify classnames and ids so they don't conflict with eachother
            {
                loader: 'svg-css-modules-loader',
                options: {
                    transformId: true,
                },
            },
        ],
    });

    return storybookBaseConfig;
};
