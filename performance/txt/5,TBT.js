/*
total Blocking Time(总阻塞时间)指标测量First Contentful Paint 首次内容绘制 (FCP)与Time to Interactive 可交互时间 (TTI)之间的总时间，这期间，主线程被阻塞的时间过长，无法作出输入响应
虽然 TBT 可以在实际情况下进行测量，但我们不建议这样做，因为用户交互会影响您网页的 TBT，从而导致您的报告中出现大量差异。如需了解页面在实际情况中的交互性，您应该测量First Input Delay 首次输入延迟 (FID)

如何改进TBT

减少第三方代码的影响
减少 JavaScript 执行时间
最小化主线程工作
保持较低的请求数和较小的传输大小

*/