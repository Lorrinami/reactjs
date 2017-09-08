promise的保证：
1.在完成JavaScript事件循环的当前运行之前，永远不会调用回调。
JavaScript有一个基于“事件循环”的并发模型。这个模型与其他语言(如C和Java)中的模型非常不同。
对象是在堆中分配的，它只是一个名称，用来表示一个很大的内存区域。
在一个函数运行完之前不会调用其他函数
2.callbacks 将会在 .then之后添加，即使在异步的成功或失败之后
3.调用可以添加多个回调。然后几次在插入顺序独立执行。
重要:总是返回promise，否则回调不会链，错误不会被捕获。
在.catch之后也可以继续添加.then
(function(){
    const wait = ms => new Promise(resolve => setTimeout(resolve, ms));
    wait().then(() => console.log(4));
    Promise.resolve().then(() => console.log(2)).then(() => console.log(3));
    console.log(1); // 1, 2, 3, 4
})()

Promise.resolve()和Promise.reject()是手动创建已经解决或拒绝的承诺的快捷方式。这有时很有用。


为了避免意外，传递到那时的函数永远不会被同步调用，即使有一个已经解决的承诺
Promise.resolve().then(() => console.log(2));
console.log(1); // 1, 2

![](1.png)


三种状态
pending待定:初始状态，既不满足也不被拒绝。
resolve完成:意思是操作成功完成。
reject拒绝:意思是操作失败。

对聚合多个Promise非常有用
最后返回一个Promise
Promise.all(iterable)方法返回单个Promise，当iterable的参数中的所有承诺都已resolve，或者iterable参数不包含任何Promise时，该承诺就会得到解决。它拒绝接受拒绝的第一个承诺。
(function(){
    var p1 = Promise.resolve(3);
    var p2 = 1337;
    var p3 = new Promise((resolve, reject) => {
    setTimeout(resolve, 100, 'foo');
    }); 

    Promise.all([p1, p2, p3]).then(values => { 
    console.log(values); // [3, 1337, "foo"] 
    });
})()


如果iterable包含了非承诺值，则它们将被忽略，但仍然被计算在返回的promise数组值中(如果Promis都满足):
(function(){
     //iterable为空,全部都执行
    var p = Promise.all([1,2,3]);
    // Promise调用resolve,全部都为resolve
    var p2 = Promise.all([1,2,3, Promise.resolve(444)]);
    // 当有一个Promise调用reject
    var p3 = Promise.all([1,2,3, Promise.reject(555)]);

    //当stack为空的时候调用函数
    setTimeout(function(){
        console.log(p);
        console.log(p2);
        console.log(p3);
    });

    // logs
    // Promise { <state>: "fulfilled", <value>: Array[3] }
    // Promise { <state>: "fulfilled", <value>: Array[4] }
    // Promise { <state>: "rejected", <reason>: 555 }
})()


异步或者同步的Promise.all
promiseall的异步性(或同步性，如果iterable通过的是空的)。
(function(){
    var resolvedPromisesArray = [Promise.resolve(33), Promise.resolve(44)];

    var p = Promise.all(resolvedPromisesArray);
    // immediately logging the value of p
    console.log(p);

    // using setTimeout we can execute code after the stack is empty
    setTimeout(function(){
        console.log('the stack is now empty');
        console.log(p);
    });

    // logs, in order:
    // Promise { <state>: "pending" } 
    // the stack is now empty
    // Promise { <state>: "fulfilled", <value>: Array[2] }
})()

(function(){
    var mixedPromisesArray = [Promise.resolve(33), Promise.reject(44)];
    var p = Promise.all(mixedPromisesArray);
    console.log(p);
    setTimeout(function(){
        console.log('the stack is now empty');
        console.log(p);
    });

    // logs
    // Promise { <state>: "pending" } 
    // the stack is now empty
    // Promise { <state>: "rejected", <reason>: 44 }
})()
但是Promise.all()的解析都是同步的，如果且仅当iterable是空的
(function(){
    var p = Promise.all([]); // iterable为空会立即执行resolved
    var p2 = Promise.all([1337, "hi"]); // non-promise values will be ignored, but the evaluation will be done asynchronously
    console.log(p);
    console.log(p2)
    setTimeout(function(){
        console.log('the stack is now empty');
        console.log(p2);
    });

    // logs
    // Promise { <state>: "fulfilled", <value>: Array[0] }
    // Promise { <state>: "pending" }
    // the stack is now empty
    // Promise { <state>: "fulfilled", <value>: Array[2] }
})()


Promise.all()如果有四个Promise会在一段时间后resolve，但是在这期间有一个Promise立即执行了reject,那么Promise.all()立即执行resolve
(function(){
    var p1 = new Promise((resolve, reject) => { 
    setTimeout(resolve, 1000, 'one'); 
    }); 
    var p2 = new Promise((resolve, reject) => { 
    setTimeout(resolve, 2000, 'two'); 
    });
    var p3 = new Promise((resolve, reject) => {
    setTimeout(resolve, 3000, 'three');
    });
    var p4 = new Promise((resolve, reject) => {
    setTimeout(resolve, 4000, 'four');
    });
    var p5 = new Promise((resolve, reject) => {
    reject('reject');
    });

    Promise.all([p1, p2, p3, p4, p5]).then(values => { 
    console.log(values);
    }, reason => {
    console.log(reason)
    });

    //From console:
    //"reject"

    //You can also use .catch
    Promise.all([p1, p2, p3, p4, p5]).then(values => { 
    console.log(values);
    }).catch(reason => { 
    console.log(reason)
    });

    //From console: 
    //"reject"
})()