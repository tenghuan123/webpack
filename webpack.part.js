const { mode } = require('webpack-nano/argv')

const path = require('path')

const { MiniHtmlWebpackPlugin } = require('mini-html-webpack-plugin')

const { WebpackPluginServe } = require('webpack-plugin-serve')

const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin')

const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const WebpackWatchedGlobEntries = require('webpack-watched-glob-entries-plugin')

exports.devServer = () => ({
    watch: true,
    mode,
    plugins: [ 
        new WebpackPluginServe({
            port: process.env.PORT || 8080,
            static: './dist',
            liveReload: true, // 在线加载模式
            waitForBuild: true, // 等待构建
            host: '127.0.0.1', // Safari 必须设置host: "127.0.0.1" WebpackPluginServe实时重新加载才能工作
        }),
    ]
})

exports.page = ({ title }) => ({
    plugins: [
        new MiniHtmlWebpackPlugin({ context: { title } }),
        new CaseSensitivePathsPlugin()
    ]
})

exports.extractCSS = ({ options = {}, loaders = [] } = {}) => {
    return {
        module: { 
            rules: [
                {
                    test: /\.css$/,
                    use: [
                        {
                            loader: MiniCssExtractPlugin.loader,
                            options,
                        },
                        "css-loader",
                        "sass-loader"
                    ].concat(loaders),
                    sideEffects: true,
                }
            ]
         },
         plugins: [
             new MiniCssExtractPlugin({
                 filename: "[name].css",
             })
         ]
    }
}

exports.GlobEntries = () => ({
        entry: WebpackWatchedGlobEntries.getEntries(
            [
                path.resolve(__dirname, './src/**/*.css'),
            ],
            { 
                ignore: './src/**/*.css'
            }
        ),
        plugins: [
            new WebpackWatchedGlobEntries(),
        ]
    }
)