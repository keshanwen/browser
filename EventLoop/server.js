var http = require("http");
var server = http.createServer();
server.on("request", function (request, response) {
    response.end(JSON.stringify({ message: 'hello' }));
})
server.listen(3000, function () {
    console.log("服务已经在3000端口启动!")
});