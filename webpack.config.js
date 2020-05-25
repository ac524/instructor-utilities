const webpack = require('webpack');
const path = require('path');

const isProduction = process.env.NODE_ENV === 'production';

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {

    entry: {
        lists: './resources/js/ListItemPicker.js'
    },

    output: {
        path: path.resolve( __dirname ),
        filename: 'public/js/[name].js',
        chunkFilename: 'js/[name]-[chunkhash].js',
        publicPath: '/wp-content/themes/freeflow/'
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                }
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    'css-loader',
                    'postcss-loader'
                ]
            },
            {
                test: /\.s[a|c]ss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    'css-loader',
                    'sass-loader',
                    'postcss-loader'
                ]
            }
        ]
    },

    plugins: [
        new MiniCssExtractPlugin({
            filename: 'public/css/[name].css',
            chunkFilename: 'public/css/[name]-[chunkhash].css',
            ignoreOrder: false, // Enable to remove warnings about conflicting order
        }),
        new CopyPlugin({
            patterns: [
              { from: './resources/html', to: 'public' }
            ],
        }),
    ],

    optimization: {
        splitChunks: {
            chunks: 'all',
        }
    }
};

if( isProduction ) {

    module.exports.plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            sourcemap: true,
            compress: {
                warnings: false
            }
        })
    )

}