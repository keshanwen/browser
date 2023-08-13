let timerCounter = 1;
class DelayTask {
    constructor(callback, delayTime) {
        this.id = timerCounter++;
        this.startTime = Date.now();
        this.callback = callback;
        this.delayTime = delayTime;
    }

}
module.exports = DelayTask;


