## 结论

**Webpack** 可以加载多种样式格式。此处介绍的方法默认将样式写入 **JavaScript** 包。

回顾一下：

- **css-loader**评估`@import`和`url()`定义。**style-loader**将其转换为 **JavaScript** 并实现 **webpack** 的[Hot Module Replacement](https://survivejs.com/webpack/appendices/hmr/)接口。
- **Webpack** 支持通过加载器编译成 **CSS** 的多种格式。其中包括 **Sass**、**Less** 和 **Stylus**。
- **PostCSS** 允许您通过其插件系统向 CSS 注入功能。
- **默认情况下， css-loader**不会触及绝对或根相对导入。`importLoaders`它允许通过选项自定义加载行为。`node_modules`您可以通过在导入前加上波浪号 ( `~`)来查找。
- 将 **Bootstrap** 与 **webpack** 一起使用需要特别小心。您可以通过通用加载器或 **Bootstrap** 特定加载器来获得更多自定义选项。

