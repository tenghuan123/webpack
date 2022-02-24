## 结论

当前设置将样式与 **JavaScript** 巧妙地分开。尽管该技术在 **CSS** 中最有价值，但它也可用于将任何类型的模块提取到单独的文件中。困难的部分`MiniCssExtractPlugin`与它的设置有关，但复杂性可以隐藏在抽象背后。

回顾一下：

- 使用`MiniCssExtractPlugin`with **style** 解决了 **Flash of Unstyled Content (FOUC)** 的问题。将 **CSS** 与 **JavaScript** 分离还可以改善缓存行为并消除潜在的攻击媒介。
- 如果您不喜欢通过 **JavaScript** 维护对样式的引用，另一种方法是通过条目来处理它们。不过，在这种情况下，您必须小心样式排序。

