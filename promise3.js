// 实现promise
// resolve
// reject
// then
// catch
// Promise.resolve
// Promise.reject
// Promise.all
// Promise.race
// Promise.any
// Promise.allSettled


class MyPromise {
  constructor(executor) {
    this.state = 'pending'
    this.data = null;
    this.onResolveCallbacks = [];
    this.onRejectCallbacks = [];
    try {
      executor(this.innerResolve.bind(this), this.innerReject.bind(this))
    } catch (e) {
      this.innerReject.call(this, e)
    }
  }
  innerResolve(value) {
    if (this.state !== 'pending') return
    this.state = 'fulfilled'
    this.data = value
    while (this.onResolveCallbacks.length) {
      this.onResolveCallbacks.shift()(this.data)
    }
  }
  innerReject(reason) {
    if (this.state !== 'pending') return
    this.state = 'rejected'
    this.data = reason
    while (this.onRejectCallbacks.length) {
      this.onRejectCallbacks.shift()(this.data)
    }
  }
  then(onFulfilled, onRejected) {
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : val => val
    onRejected = typeof onRejected === 'function' ? onRejected : reason => { throw reason }
    var thenPromise = new MyPromise((resolve, reject) => {
      setTimeout(() => {
        const thenHandle = callback => {
          try {
            const result = callback(this.data)
            if (result === thenPromise) {
              throw Error('本能使用自己的promise')
            }
            if (result instanceof MyPromise) {
              result.then(resolve, reject)
            } else {
              resolve(result)
            }
          } catch (e) {
            reject(e)
          }
        }
        if (this.state === 'fulfilled') {
          thenHandle(onFulfilled)
        } else if (this.state === 'rejected') {
          thenHandle(onRejected)
        } else if (this.state === 'pending') {
          this.onResolveCallbacks.push(onFulfilled.bind(this))
          this.onRejectCallbacks.push(onRejected.bind(this))
        }
      })
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
        })
      } else {
        resolve(value)
      }
    })
  }
  static reject(reason) {
    return new MyPromise((resolve, reject) => {
      if (reason instanceof MyPromise) {
        reason.then(undefined, err => {
          reject(err)
        })
      } else {
        reject(reason)
      }
    })
  }
  // all
  // 接收一个Promise数组，数组中如有非Promise项，则此项当做成功
  // 如果所有Promise都成功，则返回成功结果数组
  // 如果有一个Promise失败，则返回这个失败结果
  static all(promises) {
    return new MyPromise((resolve, reject) => {
      const result = [];
      let count = 0;
      const addData = (value, i) => {
        result[i] = value;
        count++;
        if (count === promises.length) {
          resolve(result)
        }
      }

      promises.forEach((promise, index) => {
        if (promse instanceof MyPromise) {
          promise.then(res => {
            addData(res, index)
          }, err => {
            reject(err)
          })
        } else {
          addData(promise, index)
        }
      });
    })
  }
  // race
  // 接收一个Promise数组，数组中如有非Promise项，则此项当做成功
  // 哪个Promise最快得到结果，就返回那个结果，无论成功失败
  static race(promises) {
    return new MyPromise((resolve, reject) => {
      promises.forEach(promise => {
        if (promise instanceof MyPromise) {
          promise.then(res => {
            resolve(res)
          }, err => {
            reject(err)
          })
        } else {
          resolve(res)
        }
      })
    })
  }
  // any
  // 接受一个promsie数组，数组中如果有非promise项，则此项当作成功
  // 如果有一个promise成功，则返回这个成功结果
  // 如果所有promise都失败，则报错
  static any(promises) {
    return new MyPromise((resolve, reject) => {
      let count = 0;
      promises.forEach((promise, index) => {
        if (promse instanceof MyPromise) {
          promise.then(res => {
            resolve(res)
          }, err => {
            count++
            if (count === promises.length) {
              reject(new AggregateError('all error'))
            }
          })
        }
      });
    })
  }
  // allSettled
  // 接收一个Promise数组，数组中如有非Promise项，则此项当做成功
  // 把每一个Promise的结果，集合成数组，返回

  static allSettled(promises) {
    return new MyPromise((resolve, reject) => {
      let count = 0;
      let result = [];
      const addData = (state, value, i) => {
        result[i] = { state, value }
        count++;
        if (count === promises.length) {
          resolve(result)
        }
      }
      promises.forEach((promise, index) => {
        if (promise instanceof MyPromise) {
          promise.then(res => {
            addData('fufilled', res, index)
          }, err => {
            addData('rejected', err, index)
          })
        } else {
          addData('fufilled', promise, index)
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