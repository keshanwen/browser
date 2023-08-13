let url = require('url');
let http = require('http');
process.on('message', function (message) {
    let { type, options } = message;
    if (type == 'send') {
        let urlObj = url.parse(options.url);
        const config = {
            hostname: urlObj.hostname,
            port: urlObj.port,
            path: urlObj.path,
            method: options.method
        };
        var req = http.request(config, (res) => {
            let chunks = [];
            res.on('data', (chunk) => {
                chunks.push(chunk);
            });
            res.on('end', () => {
                process.send({
                    type: 'response',
                    data: JSON.parse(Buffer.concat(chunks).toString())
                });
                process.exit();
            });
        });
        req.on('error', (err) => {
            console.error(err);
        });
        req.end();
    }
});