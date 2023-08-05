/* 
    根据分层树进行生成绘制步骤复合图层
    每个图层会拆分成多个绘制指令，这些指令组合在一起成为绘制列表

*/

ctx.fillStyle="black";
ctx.fillRect(0,0, 100, 0);
ctx.fillStyle="red";
ctx.fillRect(0,0, 100, 100);
ctx.fillStyle="green";
ctx.fillRect(0,100, 100, 100);
ctx.font = '20px Impact;'
ctx.strokeStyle = 'blue';
ctx.strokeText("hello", 0,120);
ctx.fillStyle="pink";
ctx.fillRect(0,0, 50, 50);
ctx.font = '20px Impact;'
ctx.strokeStyle = 'black';
ctx.strokeText("abs", 0,20);