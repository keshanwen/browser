/* （1) 渲染进程把HTML转变为DOM树型结构
（2) 渲染进程把CSS文本转为浏览器中的stylesheet
（3) 通过stylesheet计算出DOM节点的样式
（4) 根据DOM树创建布局树
（5) 并计算各个元素的布局信息
（6) 根据布局树生成分层树
（7) 根据分层树进行生成绘制步骤
（8) 把绘制步骤交给渲染进程中的合成线程进行合成
（9) 合成线程将图层分成图块(tile)
（10) 合成线程会把分好的图块发给栅格化线程池，栅格化线程会把图片(tile)转化为位图
（11) 而其实栅格化线程在工作的时候会把栅格化的工作交给GPU进程来完成，最终生成的位图就保存在了GPU内存中
（12) 当所有的图块都光栅化之后合成线程会发送绘制图块的命令给浏览器主进程
（13) 浏览器主进程然后会从GPU内存中取出位图显示到页面上 */

const EventEmitter = require('events');
class Render extends EventEmitter { }
const render = new Render();
module.exports = render;

