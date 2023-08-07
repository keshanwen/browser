/*
FP（First Paint 译为“首次绘制”）代表浏览器第一次向屏幕传输像素的时间，仅表示当前已经开始绘制了，实际意义比较小。
First Contentful Paint(首次内容渲染)表示浏览器渲染出第一个内容的时间，这个内容可以是文本、图片或SVG元素等，不包括iframe和白色背景的canvas元素
*/

/* 改进FP和FCP #

加快服务器响应速度
升级服务器配置
合理设置缓存
优化数据库索引
加大服务器带宽
服务器开启gzip压缩
开启服务器缓存(redis)
避免重定向操作
使用dns-prefetch进行DNS进行预解析
采用域名分片技术突破同域6个TCP连接限制或者采用HTTP2
使用CDN减少网络跳转
压缩JS和CSS和图片等资源
TerserWebpackPlugin
purgecss-webpack-plugin
减少HTTP请求，合并JS和CSS，合理内嵌JS和CSS

*/