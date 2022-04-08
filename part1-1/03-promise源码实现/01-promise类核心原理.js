/**
 * 1.Promise 就是一个类 在执行一个类的时候， 需要传递一个执行器进去 执行器会立即执行
 * 2.Promise 中有三种状态 分别为 成功fulfuilled 失败 rejected 等待 pending
 *   一旦状态确定为fulfilled 或者rejected 就不可更改
 * 3. resolve 和reject 函数是用来改变状态的
 *   resolve: fulfilled
 *   reject: onRejected
 * 4.then 方法内部做的事情就判断状态 如果状态是成功 调用成功的函数，如果状态是失败 调用失败的回调函数 then方法是定义在原型上的方法
 * 5. then成功回调有个参数，表示成功后的值，then失败回调有个参数，表示失败的原因
 */
const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

class MyPromise {
  constructor(executor) {
    executor(this.resolve, this.reject)
  }
  // promise 状态
  status = PENDING
  // 成功之后的值
  value = undefined
  // 失败后的原因
  reason = undefined
  // 箭头函数为了在函数调用的时候this 指向是当前实例
  resolve = (value) => {
    // 如果状态不是等待 阻止程序向下执行
    if (this.status !== PENDING) return
    // 将状态更改为成功

    this.status = FULFILLED
    // 保存成功之后的值
    this.value = value
  }
  reject = (reason) => {
    // 如果状态不是等待 阻止程序向下执行
    if (this.status !== PENDING) return
    // 将状态更改为失败
    this.status = REJECTED
    // 保存失败之后的原因
    this.reason = reason
  }
  then(successCallback, failCallback) {
    // 判断状态
    if (this.status === FULFILLED) {
      successCallback(this.value)
    } else if (this.status === REJECTED) {
      failCallback(this.reason)
    }
  }
}

class MyPromise2 {
  constructor(executor) {
    executor(this.resolve, this.reject)
  }
  status = PENDING
  value = undefined
  reason = undefined
  resolve = (value) => {
    if (this.status !== PENDING) return
    this.status = FULFILLED
    this.value = value
  }
  reject = (reason) => {
    if (this.status !== PENDING) return
    this.status = REJECTED
    this.reason = reason
  }
  then(successCallback, failCallback) {
    if (this.status === FULFILLED) {
      successCallback(this.value)
    } else if (this.status === REJECTED) {
      failCallback(this.reason)
    }
  }
}

module.exports = MyPromise