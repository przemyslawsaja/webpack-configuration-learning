const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

module.exports = {
    entry: {
        index: {import: './src/js/index.js', dependOn: 'shared'},
        sum: {import: './src/js/sum.js', dependOn: 'shared'},
        shared: 'lodash'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: "[name].[contenthash].js",
        clean: true,
        assetModuleFilename: "[name][ext]"
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            }
        ]
    },
    optimization: {
        splitChunks: {
            chunks: "all"
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'webpack app',
            filename: "index.html",
            template: "src/template.html"
        }),
        new BundleAnalyzerPlugin({
            analyzerMode: process.env.STATS || "disabled"
        }),
    ]
}