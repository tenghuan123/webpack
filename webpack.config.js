const { mode } = require('webpack-nano/argv')

const { MiniHtmlWebpackPlugin } = require('mini-html-webpack-plugin')

const { WebpackPluginServe } = require('webpack-plugin-serve')

module.exports = {
    watch: mode === 'development',
    entry: ['./src', 'webpack-plugin-serve/client'],
    mode,
    plugins: [ 
        new MiniHtmlWebpackPlugin({context: { title: 'Demo' }}),
        new WebpackPluginServe({
            port: process.env.PORT || 8080,
            static: './dist',
            liveReload: true, // 在线加载模式
            waitForBuild: true, // 等待构建
            host: '127.0.0.1', // Safari 必须设置host: "127.0.0.1" WebpackPluginServe实时重新加载才能工作
        })
    ]
}