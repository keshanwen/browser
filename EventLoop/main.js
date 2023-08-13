const messageQueue = require('./messageQueue');
(function mainThread() {
    setInterval(() => {
        let task = messageQueue.get();
        if (task) task();
    }, 1000);
})();

(function IOThread() {
    let counter = 1;
    setInterval(() => {
        messageQueue.put(()=>console.log(`task` + counter++));
    }, 1000);
})();


