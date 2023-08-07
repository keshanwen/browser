const express = require('express');
const logger = require('morgan');
const compression = require('compression')
const delayConfig = require('./delayConfig');
const app = express();
app.use(logger('dev'));

app.use((req, res, next) => {
    let url = req.url;
    let delay = delayConfig[url];
    if (delay) {
        setTimeout(next, delay);
    } else {
        next();
    }
});
app.use(compression());
app.use(express.static('public', {
    setHeaders
}));
function setHeaders(res, path) {
    res.setHeader('cache-control', 'no-cache')
}
app.listen(80, () => console.log(`server started at 80`));