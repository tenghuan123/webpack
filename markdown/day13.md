## 结论

现在的情况比以前好多了。`main`请注意捆绑包与捆绑包相比有多小`vendor`。为了从这种拆分中受益，您将在本书下一部分的“[将哈希添加到文件名](https://survivejs.com/webpack/optimizing/adding-hashes-to-filenames/)”一章中设置缓存。

回顾一下：

- Webpack 允许您通过`optimization.splitChunks.cacheGroups`字段从配置条目中拆分捆绑包。它在生产模式下也默认执行捆绑拆分。
- 供应商捆绑包包含项目的第三方代码。可以通过检查模块的导入位置来检测供应商依赖关系。
- Webpack 通过特定插件（例如`AggressiveSplittingPlugin`和`AggressiveMergingPlugin`. 主要是拆分插件在面向 HTTP/2 的设置中很方便。
- 在内部，webpack 依赖于三种块类型：入口块、普通块和初始块。

