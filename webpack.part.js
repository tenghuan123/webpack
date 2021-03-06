const { mode } = require('webpack-nano/argv')

const path = require('path')

const { MiniHtmlWebpackPlugin } = require('mini-html-webpack-plugin')

const { WebpackPluginServe } = require('webpack-plugin-serve')

const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin')

const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const WebpackWatchedGlobEntries = require('webpack-watched-glob-entries-plugin')

const { GitRevisionPlugin } = require('git-revision-webpack-plugin')

const glob = require('glob')

const PurgeCSSPlugin = require('purgecss-webpack-plugin')
const webpack = require('webpack')

const ALL_FILES = glob.sync(path.join(__dirname, 'src/*.js'))

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

// 顺风 
exports.tailwind = () => ({
    loader: "postcss-loader",
    options: {
      postcssOptions: { plugins: [require("tailwindcss")()] },
    },
})

// 消除未使用的 CSS
exports.eliminateUnusedCSS = () => ({
    plugins: [
        new PurgeCSSPlugin({ 
            path: ALL_FILES, // Consider extracting as a parameter
            extractors: [
                { 
                    extractor: (content) => content.match(/[^<>"'`\s]*[^<>"'`\s:]/g) || [],
                    extensions: ["html"]
                }
            ]
        })
    ]
})

// 设置css自动前缀
exports.autoprefixer = () => ({
    loader: 'postcss-loader',
    options: {
        postcssOptions: { plugins: [require("autoprefixer")()] }
    }
})

// babel-loader
exports.BabelLoader = () => ({
    module: {
        rules: [
            { 
                test: /\.js$/,
                include: path.join(__dirname, "app"),
                exclude: path => path.match(/node_modules/),
                use: "babel-loader",
             }
        ]
    }
})

// 加载图片
exports.loadImages = ({ limit } = {} ) => ({
    module: {
        rules: [
            { 
                test: /\.(png|jpg|jpeg)$/,
                type: "asset",
                parser: { dataUrlCondition: { maxSize: limit } }
            }
        ]
    }
})

// 加载字体
exports.loadFonts = ({ limit } = {} ) => ({
    module: {
        rules: [
            {
                test: /\.(ttf|eot|woff|woff2)$/,
                type: 'asset/resource',
                parser: { dataUrlCondition: {maxSize: limit } }
            }
        ]
    }
})

// 加载babel

const APP_SOURCE = path.join(__dirname, 'src')

exports.loadJavaScript = () => ({
    module: {
        rules: [
            { test: /\.js$/, include: APP_SOURCE, use: "babel-loader" }
        ]
    }
})

// 源映射
exports.generateSourceMaps = ({ type }) => ({ devtool: type })

// 清理
exports.clean = () => ({
    output: {
        clean: true
    }
})

// 修订
exports.attachRevision = () => ({
    plugins: [
        new webpack.BannerPlugin({
            banner: new GitRevisionPlugin().version()
        })
    ]
})