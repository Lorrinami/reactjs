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


Promise.race(iterable)异步

(function(){
    //传入的都未resolve，理论上会立即执行
    var resolvedPromisesArray = [Promise.resolve(33), Promise.resolve(44)];

    var p = Promise.race(resolvedPromisesArray);
    // immediately logging the value of p
    console.log(p);

    setTimeout(function(){
        console.log('the stack is now empty');
        console.log(p);
    });

    // logs, in order:
    // Promise { <state>: "pending" }
    // the stack is now empty
    // Promise { <state>: "fulfilled", <value>: 33 }
})()

一个空的iterable导致返回的承诺将永远为pending:
(function(){
    var foreverPendingPromise = Promise.race([]);
    console.log(foreverPendingPromise);
    setTimeout(function(){
        console.log('the stack is now empty');
        console.log(foreverPendingPromise);
    });

    // logs, in order:
    // Promise { <state>: "pending" }
    // the stack is now empty
    // Promise { <state>: "pending" }
})()

如果迭代包含一个或多个非Promise(字符串或者值)和/或Promise.resolve()/Promise.reject()，则 Promise.race()将处理在数组中发现的第一个值:
(function(){
    var foreverPendingPromise = Promise.race([]);
    var alreadyResolvedProm = Promise.reject(666);

    var arr = [foreverPendingPromise, alreadyResolvedProm, "non-Promise value"];
    var arr2 = [foreverPendingPromise, "non-Promise value", Promise.resolve(666)];
    var p = Promise.race(arr);
    var p2 = Promise.race(arr2);

    console.log(p);
    console.log(p2);
    setTimeout(function(){
        console.log('the stack is now empty');
        console.log(p);
        console.log(p2);
    });

    // logs, in order:
    // Promise { <state>: "pending" } 
    // Promise { <state>: "pending" } 
    // the stack is now empty
    // Promise { <state>: "fulfilled", <value>: 666 }
    // Promise { <state>: "fulfilled", <value>: "non-Promise value" }
})()


使用Promise的场景 -- setTimeout(),哪个速度快就先执行哪个

(function(){
    var p1 = new Promise(function(resolve, reject) { 
        setTimeout(resolve, 500, 'one'); 
    });
    var p2 = new Promise(function(resolve, reject) { 
        setTimeout(resolve, 100, 'two'); 
    });

    Promise.race([p1, p2]).then(function(value) {
    console.log(value); // "two"
    // Both resolve, but p2 is faster
    });

    var p3 = new Promise(function(resolve, reject) { 
        setTimeout(resolve, 100, 'three');
    });
    var p4 = new Promise(function(resolve, reject) { 
        setTimeout(reject, 500, 'four'); 
    });

    Promise.race([p3, p4]).then(function(value) {
    console.log(value); // "three"
    // p3 is faster, so it resolves
    }, function(reason) {
    // Not called
    });

    var p5 = new Promise(function(resolve, reject) { 
        setTimeout(resolve, 500, 'five'); 
    });
    var p6 = new Promise(function(resolve, reject) { 
        setTimeout(reject, 100, 'six');
    });

    Promise.race([p5, p6]).then(function(value) {
    // Not called
    }, function(reason) {
    console.log(reason); // "six"
    // p6 is faster, so it rejects
    });
})()


Promise.reject():返回被拒绝的原因的Promise
(function(){
    Promise.reject(new Error('fail')).then(function(error) {
    // not called
    }, function(error) {
    console.log(error); // 捕获被拒绝的原因
    });
})()


Promise.resolve():
(function(){
    Promise.resolve('Success').then(function(value) {
        console.log(value); // "Success"
    }, function(value) {
        // not called
    });
})()
//直接传入值，非promise对象
(function(){
    var p = Promise.resolve([1,2,3]);
    p.then(function(v) {
        console.log(v[0]); // 1
    });
})()
//传入的为promise对象，则promise对象作为一个值传递
(function(){
    var original = Promise.resolve(33);
    var cast = Promise.resolve(original);
    cast.then(function(value) {
        console.log('value: ' + value);
    });
    console.log('original === cast ? ' + (original === cast));

    // 顺序反转是因为then方法是一个异步方法
    // original === cast ? true
    // value: 33
})()

(function(){
    // 处理一个thenable对象
    var p1 = Promise.resolve({ 
    then: function(onFulfill, onReject) { onFulfill('fulfilled!'); }
    });
    console.log(p1 instanceof Promise) // true, object casted to a Promise

    p1.then(function(v) {
        console.log(v); // "fulfilled!"
    }, function(e) {
        // not called
    });

    // Thenable throws before callback
    // Promise rejects
    var thenable = { then: function(resolve) {
    throw new TypeError('Throwing');
    resolve('Resolving');
    }};

    var p2 = Promise.resolve(thenable);
    p2.then(function(v) {
    // not called
    }, function(e) {
    console.log(e); // TypeError: Throwing
    });

    // Thenable throws after callback
    // Promise resolves
    var thenable = { then: function(resolve) {
    resolve('Resolving');
    throw new TypeError('Throwing');
    }};

    var p3 = Promise.resolve(thenable);
    p3.then(function(v) {
    console.log(v); // "Resolving"
    }, function(e) {
    // not called
    });
})()


(function(){
    console.log(Promise.prototype.constructor)
})()


如果被拒绝抛出一个错误或返回一个Promise.reject();否则,它是解决
catch()返回一个Promise，只处理reject情况
相当于obj.then(undefined,onRejected),内部调用then()
(function(){
    // overriding original Promise.prototype.then/catch just to add some logs
    (function(Promise){
        var originalThen = Promise.prototype.then;
        var originalCatch = Promise.prototype.catch;
        
        Promise.prototype.then = function(){
            console.log('> > > > > > called .then on %o with arguments: %o', this, arguments);
            return originalThen.apply(this, arguments);
        };
        Promise.prototype.catch = function(){
            console.log('> > > > > > called .catch on %o with arguments: %o', this, arguments);
            return originalCatch.apply(this, arguments);
        };

    })(this.Promise);



    // calling catch on an already resolved promise
    Promise.resolve().catch(function XXX(){});

    // logs:
    // > > > > > > called .catch on Promise{} with arguments: Arguments{1} [0: function XXX()]
    // > > > > > 
})()


使用
(function(){
var p1 = new Promise(function(resolve, reject) {
      setTimeout(function() {
             resolve('Success');
        }, 10000);
});

p1.then(function(value) {
  console.log(value); // "Success!"
  throw 'oh, no!';
}).catch(function(e) {
  console.log(e); // "oh, no!"
}).then(function(){
  console.log('after a catch the chain is restored');
}, function () {
  console.log('Not fired due to the catch');
});

// The following behaves the same as above
p1.then(function(value) {
  console.log(value); // "Success!"
  return Promise.reject('oh, no!');
}).catch(function(e) {
  console.log(e); // "oh, no!"
}).then(function(){
  console.log('after a catch the chain is restored');
}, function () {
  console.log('Not fired due to the catch');
});
})()






then
在未决状态下的承诺。处理函数(onFulfilled或onRejectd)被异步调用(当堆栈为空时)。调用处理程序函数后，如果处理程序函数:

返回一个值，然后返回的承诺以返回值作为其值解析;
抛出一个错误，然后返回的承诺被抛出的错误作为其值而被拒绝;
返回已解决的承诺，然后返回的承诺以该承诺的值作为其值;
返回一个已经被拒绝的承诺，然后返回的承诺被拒绝，以该承诺的价值作为它的价值
返回另一个未决的承诺对象

(function(){
    Promise.resolve('foo')
    // 1. Receive "foo", concatenate "bar" to it, and resolve that to the next then
    .then(function(string) {
        return new Promise(function(resolve, reject) {//返回的为Promise，会执行完后才走下一个then
        setTimeout(function() {
            string += 'bar';
            console.log('first');
            resolve(string);
        }, 1);
        });
    })
    // 2. receive "foobar", register a callback function to work on that string
    // and print it to the console, but not before returning the unworked on
    // string to the next then
    .then(function(string) {
        setTimeout(function() {
        string += 'baz';
        console.log(string);
        }, 1)
        return string;//因为返回的不是Promise
    })
    // 3. print helpful messages about how the code in this section will be run
    // before the string is actually processed by the mocked asynchronous code in the
    // previous then block.  
    .then(function(string) {
        console.log("Last Then:  oops... didn't bother to instantiate and return " +
                    "a promise in the prior then so the sequence may be a bit " +
                    "surprising");

        // Note that `string` will not have the 'baz' bit of it at this point. This 
        // is because we mocked that to happen asynchronously with a setTimeout function
        console.log(string);
    });
})()
Last Then:  oops... didn't bother to instantiate and return a promise in the prior then so the sequence may be a bit surprising
VM542:32 foobar
VM542:18 foobarbaz


(function(){
    var p2 = new Promise(function(resolve, reject) {
    resolve(1);
    });

    p2.then(function(value) {
    console.log(value); // 1
    return value + 1;
    }).then(function(value) {
    console.log(value + '- This synchronous usage is virtually pointless'); // 2- This synchronous usage is virtually pointless
    });

    p2.then(function(value) {
    console.log(value); // 1
    });
})()

//捕获异常后继续执行后面的then()
(funtion(){
    Promise.resolve()
    .then( () => {
        // Makes .then() return a rejected promise
        throw 'Oh no!';
    })
    .catch( reason => {
        console.error( 'onRejected function called: ', reason );
    })
    .then( () => {
        console.log( "I am always called even if the prior then's promise rejects" );
    });
})()



(function(){
function resolveLater(resolve, reject) {
  setTimeout(function () {
    resolve(10);
  }, 1000);
}
function rejectLater(resolve, reject) {
  setTimeout(function () {
    reject(20);
  }, 1000);
}

var p1 = Promise.resolve('foo');
var p2 = p1.then(function() {
  // Return promise here, that will be resolved to 10 after 1 second
  return new Promise(resolveLater);
});
p2.then(function(v) {
  console.log('resolved', v);  // "resolved", 10
}, function(e) {
  // not called
  console.log('rejected', e);
});

var p3 = p1.then(function() {
  // Return promise here, that will be rejected with 20 after 1 second
  return new Promise(rejectLater);
});
p3.then(function(v) {
  // not called
  console.log('resolved', v);
}, function(e) {
  console.log('rejected', e); // "rejected", 20
});
})()


(function(){
let myFirstPromise = new Promise((resolve, reject) => {
  // We call resolve(...) when what we were doing asynchronously was successful, and reject(...) when it failed.
  // In this example, we use setTimeout(...) to simulate async code. 
  // In reality, you will probably be using something like XHR or an HTML5 API.
 
    resolve("Success!"); // Yay! Everything went well!

});
console.log(myFirstPromise);
myFirstPromise.then((successMessage) => {
  // successMessage is whatever we passed in the resolve(...) function above.
  // It doesn't have to be a string, but if it is only a succeed message, it probably will be.
  console.log("Yay! " + successMessage);
});
})()


//里面没有setTimeout函数时，调用resole，打印状态为resolve，在setTimeout函数内调用时，打印为pending