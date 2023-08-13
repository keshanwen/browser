const { fork } = require('child_process');
const { macroTaskQueue, microTaskQueue } = require('./messageQueue');
const DelayTask = require('./DelayTask');
let delayTaskQueue = [];

(function mainThread() {
    setInterval(() => {
        let macroTask = macroTaskQueue.get();
        if (macroTask) macroTask();
        processDelayTask();
        let microTask;
        while (microTask = microTaskQueue.get()) {
          microTask();
        }
    }, 10);
})();

(function IOThread() {
    let browser = fork('./browser.js');
   console.time('cost');
    browser.on('message', function ({ data }) {
        console.log(data);
        setTimeout(() => {
            console.timeEnd('cost');
        }, 1000);
    });
    browser.send({ type: 'click', data: 'clicked' });
})();

function setTimeout(callback, delayTime) {
  delayTaskQueue.push(new DelayTask(callback, delayTime))
}

function clearTimeout(timerId) {
  delayTaskQueue = delayTaskQueue.filter(delayTask => {
    return delayTask.id !== timerId
  })
}

function processDelayTask() {
  delayTaskQueue = delayTaskQueue.filter(delayTask => {
    const { callback, startTime, delayTime } = delayTask
    if (Date.now() > startTime + delayTime) {
      macroTaskQueue.put(callback)
      return false
    }
    return true
  })
}