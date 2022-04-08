class MyPromise {
  constructor(executor) {
    this.initValue();
    this.initBind();
    try {
      executor(this.innerResolve, this.innerReject)
    } catch (e) {
      this.innerReject(e)
    }
  }
  initValue() {
    this.PromiseResult = null; // 终值
    this.PromiseState = 'pending'; // 状态
    this.onFulfilledCallbacks = [];
    this.onRejectedCallbacks = [];

  }
  initBind() {
    this.innerResolve = this.innerResolve.bind(this)
    this.innerReject = this.innerReject.bind(this)
    this.catch = this.catch.bind(this)
  }
  innerResolve(value) {
    if (this.PromiseState !== 'pending') return
    this.PromiseState = 'fulfilled'
    this.PromiseResult = value
    // 可以用queueMicrotask 包装

    while (this.onFulfilledCallbacks.length) {
      this.onFulfilledCallbacks.shift()(this.PromiseResult)
    }
  }
  innerReject(reason) {
    if (this.PromiseState !== 'pending') return
    this.PromiseState = 'rejected'
    this.PromiseResult = reason
    while (this.onRejectedCallbacks.length) {
      this.onRejectedCallbacks.shift()(this.PromiseResult)
    }
  }
  then(onFulfilled, onRejected) {
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : val => val
    onRejected = typeof onRejected === 'function' ? onRejected : reason => { throw reason }
    var thenPromise = new MyPromise((resolve, reject) => {
      const resolvePromise = cb => {
        setTimeout(() => {
          try {
            const x = cb(this.PromiseResult)
            console.log('PromiseResult', this.PromiseResult)
            console.log('x', x)
            if (x === thenPromise) {
              throw new Error('不能返回自身哦')
            }
            if (x instanceof MyPromise) {
              x.then(resolve, reject)
            } else {
              resolve(x)
            }
          } catch (e) {
            reject(x)
          }
        })
      }

      if (this.PromiseState === 'fulfilled') {
        resolvePromise(onFulfilled)
      } else if (this.PromiseState === 'rejected') {
        resolvePromise(onRejected)
      } else if (this.PromiseState === 'pending') {
        this.onFulfilledCallbacks.push(onFulfilled.bind(this))
        this.onRejectedCallbacks.push(onRejected.bind(this))
      }
    })
    return thenPromise
  }
  catch(onRejected) {
    return this.then(undefined, onRejected)
  }
  static resolve(value) {
    return new MyPromise((resolve, reject) => {
      if (value instanceof MyPromise) {
        value.then(res => {
          resolve(res)
        }, err => {
          reject(err)
        })
      } else {
        resolve(value)
      }
    })
  }
  static reject(reason) {
    return new MyPromise((resolve, reject) => {
      reject(reason)
    })
  }
  catch(onRejected) {
    this.then(undefined, onRejected)
  }
  static all(promises) {
    const result = []
    let count = 0;
    return new MyPromise((resolve, reject) => {
      const addData = (index, value) => {
        result[index] = value;
        count++
        if (count === promises.length) resolve(result)
      }
      promises.forEach((promise, index) => {
        if (promise instanceof MyPromise) {
          promise.then(res => {
            addData(index, res)
          }, err => reject(err))
        } else {
          addData(index, promise)
        }
      })

    })
  }
  static race(promises) {
    return new MyPromise((resolve, reject) => {
      promises.forEach((promise) => {
        if (promise instanceof MyPromise) {
          promise.then(res => { resolve(res) }, err => { reject(err) })
        } else {
          resolve(promise)
        }
      })
    })
  }
  static allSettled(promises) {
    const result = [];
    let count = 0;
    const addData = (status, value, i) => {
      result[i] = {
        status,
        value
      }
      count++
      if (count === promises.length) resolve(result)
    }
    promises.forEach((promises, index) => {
      if (promise instanceof MyPromise) {
        promise.then(res => {
          addData('fulfilled', res, i)
        }, err => {
          addData('rejected', err, i)
        })
      } else {
        addData('fulfilled', promise, i)
      }
    })
  }
  static any(promises) {
    return new MyPromise((resolve, reject) => {
      let count = 0;
      promises.forEach(promise => {
        if (promise instanceof MyPromise) {
          promise.then(res => {
            resolve(res)
          }, err => {
            count++;
            if (count === promises.length) {
              //  AggregateError:：表示当多个错误​​需要包装在一个错误中时，该对象表示一个错误。这是一个还没有正式使用的功能，所以在这里也不多做解释
              reject(new AggregateError('All promises were rejected'))
            }
          })
        }
      })
    })
  }
}

const test1 = new MyPromise((resolve, reject) => {
  resolve('成功')
})
console.log(test1) // MyPromise { PromiseState: 'fulfilled', PromiseResult: '成功' }
console.log('-------------------------------------------------清场--------------------------------------')
const test2 = new MyPromise((resolve, reject) => {
  resolve('成功')
  reject('失败')
})
console.log(test2)
console.log('-------------------------------------------------清场--------------------------------------')
const test3 = new MyPromise((resolve, reject) => {
  throw ('失败')
})
console.log(test3)
console.log('-------------------------------------------------清场--------------------------------------')

const test4 = new MyPromise((resolve, reject) => {
  resolve('成功')
}).then(res => console.log(res), err => console.log(err))
console.log('-------------------------------------------------清场--------------------------------------')

const test5 = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve('成功') // 1秒后输出 成功
    // resolve('成功') // 1秒后输出 失败
  }, 1000)
}).then(res => console.log(res), err => console.log(err))
console.log('-------------------------------------------------清场--------------------------------------')

const test6 = new MyPromise((resolve, reject) => {
  resolve(100) // 输出 状态：失败 值：200
  // reject(100) // 输出 状态：成功 值：300
  // 这里可没搞反哦。真的搞懂了，就知道了为啥这里是反的
}).then(res => {
  console.log('.then1-resolve')
  console.log(res)
  return new MyPromise((resolve, reject) => reject(2 * res))
}, err => new MyPromise((resolve, reject) => resolve(2 * res)))
  .then(res => {
    console.log('.then2-resolve')
    console.log(res)
  }, err => {
    console.log('.then2-reject')
    console.log(err)
  }).then(res => {
    console.log('.then3-resolve')
    console.log(res)
  }, err => {
    console.log('.then3-reject')
    console.log(err)
  })
console.log('-------------------------------------------------清场--------------------------------------')
const test7 = new MyPromise((resolve, reject) => {
  resolve(100) // 输出 状态：失败 值：200
  // reject(100) // 输出 状态：成功 值：300
  // 这里可没搞反哦。真的搞懂了，就知道了为啥这里是反的
}).then(res => {
  console.log('.then1-resolve')
  console.log(res)
  return new MyPromise((resolve, reject) => reject(2 * res))
}, err => new MyPromise((resolve, reject) => resolve(2 * res))).then(res => {
  console.log('.then2-resolve')
  console.log(res)
}, err => {
  console.log('.then2-reject')
  console.log(err)
})
console.log('test7', test7)
test7.then(res => {
  console.log('.then3-resolve')
  console.log(res)
}, err => {
  console.log('.then3-reject')
  console.log(err)
})
console.log('start')
console.log('-------------------------------------------------清场--------------------------------------')
const test8 = MyPromise.resolve(2)
console.log('test8', test8)

console.log('-------------------------------------------------清场--------------------------------------')
const test9 = MyPromise.reject(2)
console.log('test9', test9)

console.log('-------------------------------------------------清场--------------------------------------')
const arr = [1, 2, 3]
const test10 = MyPromise.all(arr.map(item => {
  return new MyPromise(resolve => resolve(item))
})).then(res => {
  console.log('test10-then', res)
})
console.log('test10', test10)