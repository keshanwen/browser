const ObjectEnvironmentRecords = require('./ObjectEnvironmentRecords');
const LexicalEnvironment = require('./LexicalEnvironment');
const ExecutionContext = require('./ExecutionContext');
const ExecutionContexts = require('./ExecutionContexts');
const FunctionInstance = require('./FunctionInstance');

//创建执行上下文栈
const ECStack = new ExecutionContexts();
//创建全局环境记录对象
const globalEnvironmentRecord = new ObjectEnvironmentRecords(global);
//创建全局环境
const globalLexicalEnvironment = new LexicalEnvironment(globalEnvironmentRecord, null);
//创建全局执行上下文
let globalExecutionContext = new ExecutionContext(globalLexicalEnvironment, global);
//把全局执行上下文放入执行上下文栈
ECStack.push(globalExecutionContext);

//创建a变量并初始化为undefined
ECStack.current.lexicalEnvironment.createBinding('a');
ECStack.current.lexicalEnvironment.setBinding('a', undefined);
//创建fn变量并赋值为函数
let oneFn = new FunctionInstance('one', 'var b = 2;\nconsole.log(a, b);',
    ECStack.current.lexicalEnvironment);
ECStack.current.lexicalEnvironment.createBinding('one');
ECStack.current.lexicalEnvironment.setBinding('one', oneFn);

//开始执行代码,给a变量赋值为1
ECStack.current.lexicalEnvironment.setBinding('a', 1);
//遇到函数则创建一个新的词法环境
let oneLexicalEnvironment = LexicalEnvironment.NewDeclarativeEnvironment(oneFn.scope);
//创建one函数执行上下文
let oneExecutionContext = new ExecutionContext(oneLexicalEnvironment, global);
//把one函数执行上下文推入执行上下文栈并成为最新的执行上下文
ECStack.push(oneExecutionContext);

//创建并绑定变量b,执行变量提升
ECStack.current.lexicalEnvironment.createBinding('b');
ECStack.current.lexicalEnvironment.setBinding('b', undefined);
//开始执行函数代码，给变量b赋值为2
ECStack.current.lexicalEnvironment.setBinding('b', 2);
//按作用域链查找a和b变量的值并打印
console.log(ECStack.current.lexicalEnvironment.getIdentifierReference('a')
    , ECStack.current.lexicalEnvironment.getIdentifierReference('b'));
//弹出one执行上下文，回到全局执行上下文，one执行上下文销毁
ECStack.pop();