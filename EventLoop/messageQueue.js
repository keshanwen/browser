class MessageQueue {
    constructor() {
        this.messages = [];
    }
    put(message) {
        this.messages.push(message);
    }
    get() {
        return this.messages.pop();
    }
}

exports.macroTaskQueue = new MessageQueue();
exports.microTaskQueue = new MessageQueue();