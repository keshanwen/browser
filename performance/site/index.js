const express = require('express');
const logger = require('morgan');
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
app.use(express.static('public'));
app.listen(80, () => console.log(`server started at 80`));