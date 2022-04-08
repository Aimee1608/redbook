/**
 * finally
 * 不论promise 的状态是成功或者失败 finally 一定会执行一次
 * finally 有个参数是一个回调函数
 * finally 回调执行完成之后 才会返回到结果
 * 在finally 后面能链式调用then 方法 拿到结果
 * 每个实例都有finally 方法
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
      const resolvePromise = (promise2, x, resolve, reject) => {
        // if (x === promise2) {
        //   return reject(new TypeError('Chaining cycle detected for promise #<Promise>'))
        // }
        if (x instanceof MyPromise) {
          x.then(resolve, reject)
        } else {
          resolve(x)
        }
      }

      // 判断状态
      if (this.status === FULFILLED) {
        setTimeout(() => {
          try {
            let x = successCallback(this.value)
            // 判断x的值是普通值还是promise对象
            // 如果是普通值 直接调用resolve
            // 如果是promise对象 查看promise对象返回的结果
            // 再根据promise对象返回的结果 决定调用resolve  还是调用reject
            resolvePromise(promise2, x, resolve, reject)
          } catch (e) {
            reject(e)
          }
        }, 0)

      } else if (this.status === REJECTED) {
        setTimeout(() => {
          try {
            let x = failCallback(this.reason)
            // 判断x的值是普通值还是promise对象
            // 如果是普通值 直接调用resolve
            // 如果是promise对象 查看promise对象返回的结果
            // 再根据promise对象返回的结果 决定调用resolve  还是调用reject
            resolvePromise(promise2, x, resolve, reject)
          } catch (e) {
            reject(e)
          }
        }, 0)
      } else if (this.status === PENDING) {
        // 等待
        // 将成功或者失败回调存起来
        this.successCallback.push(() => {
          successCallback()
        })
        this.failCallback.push(failCallback)
      }
    })
    return promise2

  }
}


module.exports = MyPromise