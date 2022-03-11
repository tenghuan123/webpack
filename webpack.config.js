const { mode } = require('webpack-nano/argv')

const path = require('path')

const { merge } = require('webpack-merge')

const parts = require('./webpack.part')

// const glob = require('glob')

const cssLoaders = [parts.autoprefixer(), parts.tailwind()]

const commonConfig = merge([
    // { 
    //     entry: {
    //         app: {
    //             import: path.join(__dirname, 'src', 'index.js'),
    //             dependOn: 'vendor',
    //         },
    //         vendor: ['react', 'react-dom']
    //     },
    //     output: {
    //         chunkFilename: 'chunk.[id].js'
    //     }
    // },
    { entry: ['./src'] }
    // {
    //     entry: { style: glob.sync("./src/**/*.css") } // 在此更改之后，您不必再从应用程序代码中引用样式。但是，在这种方法中，您必须小心 CSS 排序
    // },
    // parts.GlobEntries(),
    parts.BabelLoader(),
    parts.page({ title: 'Demo' }),
    parts.extractCSS({ loaders: cssLoaders }),
    parts.loadImages({ limit: 150 }),
    parts.loadFonts({ limit: 150 }),
    parts.loadJavaScript(),
    parts.generateSourceMaps({ type: 'source-map' })
])

const productionConfig = merge([
    // parts.eliminateUnusedCSS(),

    { optimization: 
        { 
            splitChunks: 
            { 
                cacheGroups: {
                    commons: {
                        test: /[\\/]node_modules[\\/]/,
                        name: 'vendor',
                        chunks: "initial",
                    }
                },
                minSize: { javascript: 20000, "css/mini-extra": 10000 }
            } 
        } 
    },

    { entry: ["webpack-plugin-serve/client"] },
    parts.devServer()
]);

const developmentConfig = merge([
    { entry: ["webpack-plugin-serve/client"] },
    parts.devServer()
]);

const getConfig = (mode) => {
    switch(mode) {
        case "prod:legacy":
            process.env.BROWSERSLIST_ENV = "legacy"
            return merge(commonConfig, productionConfig)
        case "prod:modern":
            process.env.BROWSERSLIST_ENV = "modern"
            return merge(commonConfig, productionConfig)
        case "production":
            return merge(commonConfig, productionConfig, { mode })
        case "development":
            return merge(commonConfig, developmentConfig, { mode })
        default:
            throw new Error(`Trying to use an unknown mode, ${mode}`)
    }
}

module.exports = getConfig(mode)