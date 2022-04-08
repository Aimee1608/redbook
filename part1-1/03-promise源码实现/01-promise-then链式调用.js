/**
 * 1.Promise 就是一个类 在执行一个类的时候， 需要传递一个执行器进去 执行器会立即执行
 * 2.Promise 中有三种状态 分别为 成功fulfuilled 失败 rejected 等待 pending
 *   一旦状态确定为fulfilled 或者rejected 就不可更改
 * 3. resolve 和reject 函数是用来改变状态的
 *   resolve: fulfilled
 *   reject: onRejected
 * 4.then 方法内部做的事情就判断状态 如果状态是成功 调用成功的函数，如果状态是失败 调用失败的回调函数 then方法是定义在原型上的方法
 * 5. then成功回调有个参数，表示成功后的值，then失败回调有个参数，表示失败的原因
 * 6.当 执行器中resolve或者reject 调用是异步的，需要将pending 状态then 函数调用先存起来，等状态改变为fulfilled 或者rejected 之后再执行
 * 7. then方法是可以被链式调用的, 后面then方法的回调函数拿到值的是上一个then方法的回调函数的返回值
 * 8.在执行构造器和执行then 函数的时候 需要加上try catch捕获错误
 */
const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

class MyPromise {
  constructor(executor) {
    try {
      executor(this.resolve, this.reject)
    } catch (e) {
      this.reject(e)
    }
  }
  // promise 状态
  status = PENDING
  // 成功之后的值
  value = undefined
  // 失败后的原因
  reason = undefined
  // 成功回调
  successCallback = []
  // 失败回调
  failCallback = []
  // 箭头函数为了在函数调用的时候this 指向是当前实例
  resolve = (value) => {
    // 如果状态不是等待 阻止程序向下执行
    if (this.status !== PENDING) return
    // 将状态更改为成功

    this.status = FULFILLED
    // 保存成功之后的值
    this.value = value
    // 判断是否有成功回调
    while (this.successCallback.length) {
      this.successCallback.shift()(this.value)
    }
  }
  reject = (reason) => {
    // 如果状态不是等待 阻止程序向下执行
    if (this.status !== PENDING) return
    // 将状态更改为失败
    this.status = REJECTED
    // 保存失败之后的原因
    this.reason = reason
    // 判断是否有失败回调
    while (this.failCallback.length) {
      this.failCallback.shift()(this.reason)
    }
  }
  then(successCallback, failCallback) {
    // 先判断函数时候有参数
    successCallback = successCallback ? successCallback : value => value
    failCallback = failCallback ? failCallback : reason => { throw reason }

    // 返回一个promise
    let promise2 = new MyPromise((resolve, reject) => {
      // 判断x的值是普通值还是promise对象
      // 如果是普通值 直接调用resolve
      // 如果是promise对象 查看promise对象返回的结果
      // 再根据promise对象返回的结果 决定调用resolve  还是调用reject

      const resolvePromise = (callback, value) => {
        setTimeout(() => {
          try {
            const x = callback(value)
            // 没有复现循环调用？？？？？？
            // 如果是异步 默认返回pending状态，并不会进入到resolve状态，所以会卡主不会乡下走
            if (x === promise2) {
              return reject(new TypeError('Chaining cycle detected for promise #<Promise>'))
            }
            if (x instanceof MyPromise) {
              console.log('---MyPromise----', x)
              x.then(resolve, reject)
            } else {
              console.log('----notpromise---', x)
              resolve(x)
            }
          } catch (e) {
            reject(e)
          }
        }, 0)
      }

      // 判断状态
      if (this.status === FULFILLED) {
        resolvePromise(successCallback, this.value)

      } else if (this.status === REJECTED) {

        resolvePromise(failCallback, this.reason)
      } else if (this.status === PENDING) {
        // 等待
        // 将成功或者失败回调存起来
        this.successCallback.push(() => {
          resolvePromise(successCallback, this.value)
        })
        this.failCallback.push(() => {
          resolvePromise(failCallback, this.reason)
        })
      }

    })
    return promise2

  }
}



const promise3 = new MyPromise((resolve, reject) => {
  resolve('成功')
  // reject('失败')
})

// 没有复现循环调用的情况，直接不会执行了 因为return的是pending 状态的promise 不会进入到resolve
var promise33 = promise3.then(res => {
  console.log('res--then1', res)
  // throw new Error('throw error')
  return promise33
}, reason => {
  console.log('reason1', reason.message)
})
// console.log('promise33', promise33)

promise33.then(value => {
  console.log('value-2', value)
}, reason => {
  console.log('reason-2', reason.message)
})



module.exports = MyPromise