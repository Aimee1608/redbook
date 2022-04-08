// promise 静态方法

// 模仿实现promise之前的实现方式
Promise.resolve({
  then: function (onFulfilled, onRejected) {
    onFulfilled('foo')
  }
}).then(function (value) {
  console.log(value)
})

// Promise.resolve() 如果参数为一个 fulfilled 的promise 对象 返回的结果就是原参数的promise
const p1 = Promise.resolve(1)
const p2 = Promise.resolve(p1)
console.log('p1--p2', p1 === p2)