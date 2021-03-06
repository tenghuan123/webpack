## 结论

尽管配置在技术上与以前相同，但现在您有空间通过组合来扩展它。

回顾一下：

- 鉴于 **webpack** 配置是底层的 **JavaScript** 代码，有很多方法可以管理它。
- 您应该选择一种方法来编写对您最有意义的配置。[webpack-merge](https://www.npmjs.com/package/webpack-merge)的开发旨在为组合提供一种轻量级的方法，但您可以在野外找到许多其他选项。
- 组合可以启用配置共享。不必为每个存储库维护自定义配置，您可以通过这种方式在存储库之间共享它。使用 npm 包可以做到这一点。开发配置类似于开发任何其他代码。然而，这一次，您将您的实践编码为包。

