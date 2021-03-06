## 结论

通常，您通过识别问题然后发现一个插件来解决它来使用 webpack
在 webpack 之外解决这些类型的问题是完全可以接受的，但 webpack 通常也可以处理它们

回顾一下：

- 您可以找到许多作为任务工作的小插件，并将`webpack`推向任务运行器。
- 这些任务包括清理构建和部署。"[部署应用](https://survivejs.com/webpack/techniques/deploying/)"程序一章详细讨论了后一个主题。
- 向生产构建添加小注释以告知已部署的版本可能是一个好主意。这样，您可以更快地调试潜在问题。
- 像这样的次要任务可以在 webpack 之外执行。如果您正在使用多页一章中讨论的多页设置，这将成为必需品。

