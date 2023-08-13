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

    browser.on('message', function ({ data }) {
        console.log(data);
       let xhr = new XMLHttpRequest();
       xhr.open('GET', 'http://localhost:3000/data');
       xhr.onload = function () {
           console.log(xhr.response);
      }
      xhr.send();
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

class XMLHttpRequest {
  constructor() {
    this.options = {}
  }

  open(method, url) {
    this.options.method = method
    this.options.url = url
  }

  send() {
    let child = fork('./XMLHttpRequest.js');
    child.on('message', (message) => {
      if (message.type === 'response') {
        this.response = message.data
        macroTaskQueue.put(this.onload)
      }
    })
    child.send({
      type: 'send',
      options: this.options
    })
  }
}