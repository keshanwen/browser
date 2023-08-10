class ExecutionContext {
    constructor(lexicalEnvironment, thisBinding) {
        this.lexicalEnvironment = lexicalEnvironment;
        this.thisBinding = thisBinding;
    }
}
module.exports = ExecutionContext;