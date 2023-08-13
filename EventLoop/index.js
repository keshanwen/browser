/* setTimeout(function  () {
  console.log('timeout');
},0);
setImmediate(function  () {
  console.log('immediate');
},0); */

/* const fs = require('fs')
fs.readFile(__filename, () => {
    setTimeout(() => {
        console.log('timeout');
    }, 0)
    setImmediate(() => {
        console.log('immediate')
    })
}) */

/*
setTimeout(() => {
    console.log('setTimeout1')
    Promise.resolve().then(function () {
        console.log('promise1')
    })
}, 0)
setTimeout(() => {
    console.log('setTimeout2')
    Promise.resolve().then(function () {
        console.log('promise2')
    })
}, 0)
setImmediate(() => {
    console.log('setImmediate1')
    Promise.resolve().then(function () {
        console.log('promise3')
    })
}, 0)

process.nextTick(() => {
    console.log('nextTick1');
    Promise.resolve().then(() => console.log('promise4'));
    process.nextTick(() => {
        console.log('nextTick2');
        Promise.resolve().then(() => console.log('promise5'));
        process.nextTick(() => {
            console.log('nextTick3')
            process.nextTick(() => {
                console.log('nextTick4')
            })
        })
    })
})

 */

/*
let fs = require('fs');
setTimeout(() => {
    console.log('1');
    let rs1 = fs.createReadStream(__filename);
    rs1.on('data', () => {
        rs1.destroy();
        setImmediate(() => console.log('setImmediate_a'));
        setTimeout(() => {
            console.log('setTimeout_a')
        });
        console.log('a');
    });
    rs1.on('close', () => console.log('end_a'));
    console.log('2');
    setImmediate(function () {
        console.log('setImmediate1');
        process.nextTick(() => console.log('nextTick1'));
    });
    setImmediate(function () {
        console.log('setImmediate2');
        process.nextTick(() => console.log('nextTick2'));
    });
    console.log('3');
    setTimeout(() => {
        console.log('setTimeout1');
        process.nextTick(() => {
            console.log('nextTick3')
            process.nextTick(() => console.log('nextTick4'));
        });
    });
    setTimeout(() => {
        console.log('setTimeout2');
    });
    console.log('4');
}, 1000);
*/

/*
Promise.resolve().then(() => {
    console.log(0);
    return new Promise((resolve)=>{
        resolve('a');
    })
}).then(res => {
    console.log(res)
})
Promise.resolve().then(() => {
    console.log(1);
}).then(() => {
    console.log(2);
}).then(() => {
    console.log(3);
}).then(() => {
    console.log(4);
}).then(() => {
    console.log(5);
})
*/

let promise1 = Promise.resolve();
let promise2 = promise1.then(() => {
    console.log(0);
    let promise10 = Promise.resolve('a');
    return promise10;
})
let promise3 = promise2.then(res => {
    console.log(res)
})
let promise4 = Promise.resolve();
let promise5 = promise4.then(() => {
    console.log(1);
});
let promise6 = promise5.then(() => {
    console.log(2);
});
let promise7 = promise6.then(() => {
    console.log(3);
});
let promise8 = promise7.then(() => {
    console.log(4);
});
let promise9 = promise8.then(() => {
    console.log(5);
})