const { mode } = require('webpack-nano/argv')

const { merge } = require('webpack-merge')

const parts = require('./webpack.part')

// const glob = require('glob')

const commonConfig = merge([
    { entry: ['./src'] },
    // {
    //     entry: { style: glob.sync("./src/**/*.css") } // 在此更改之后，您不必再从应用程序代码中引用样式。但是，在这种方法中，您必须小心 CSS 排序
    // },
    // parts.GlobEntries(),
    parts.page({ title: 'Demo' }),
    parts.extractCSS()
])

const productionConfig = merge([]);

const developmentConfig = merge([
    { entry: ["webpack-plugin-serve/client"] },
    parts.devServer()
]);

const getConfig = (mode) => {
    switch(mode) {
        case "production":
            return merge(commonConfig, productionConfig, { mode })
        case "development":
            return merge(commonConfig, developmentConfig, { mode })
        default:
            throw new Error(`Trying to use an unknown mode, ${mode}`)
    }
}

module.exports = getConfig(mode)