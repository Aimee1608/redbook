/*
尽可能还原 Promise 中的每一个 API, 并通过注释的方式描述思路和原理.
*/
/**
 * Promise 是一个类 可以生成实例
 * Promise 实例有三种状态 分别为 等待 pending 成功 fulfilled 失败 rejected, 当等待状态改变后 将不可再更改
 * Promise 构造函数接受一个 生成器函数，并返回两个方法，resolve 和reject
 * Promise 生成器函数的参数 resolve 和reject 分别为返回参数 value 和reason 表示成功的结果和失败的原因
 * Promise 有一个then 方法，分别接受成功和失败的回调函数，并将成功的结果或失败的原因作为参数传入，并返回一个fulfilled 或者rejected状态的promise实例
 *    then方法注意事项：参数不为函数的时候，会忽略参数，并设置默认的回调函数。成功函数默认将结果向后传，失败函数默认抛出错误
 *                    结果为promise 对象时，返回promise对象的结果 及promise.then的方法
 *                    如果为pending（比如resolve 在定时器中） 需要将回到函数存起来 当状态改变后执行 
 *                    需要两个属性 successCallback 和failCallback 存pending时候的方法 可能会有多次调用，需要已数组的形式存储
 *                    在resolve 或者reject的时候，分别执行对应的暂存的回调
 *                    为了判断返回的promise实例是否是自己，需要添加setTimeout 设置异步
 * 处理异常：then 方法 需要捕获resolve 或者successCallback 执行的异常
 *         constructor 需要处理resolve的异常，并用reject拦截
 * 静态resolve 返回一个fulfilled 状态的promise 对象，如果参数为promise对象 则直接返回该对象
 * 静态reject  返回一个rejected 状态的promies 对象，如果参数为promise对象 则直接返回该对象
 * Promise finally 方法： 接受一个回调函数，不论结果为fulfilled 或者rejected 都会执行 回调函数执行完后才会返回结果 并且返回promise 对象可以接then方法
 * Promise catch 方法： 接受一个回调函数，捕获错误 并返回一个promise 对象
 * 静态 all 方法：接受一个数组，按顺序返回数组的结果，返回一个promise对象，
 *                  如果都成功返回fulfilled状态的promise对象，并把结果当作回调参数返回，如果有一个失败，则返回rejected状态的promise对象，并将错误原因作为回调参数返回
 *                  如果数组中有常量，则该项把该常量作为成功的结果返回
 *                  如果数组元素有promise对象 则该项返回该promise执行的结果
 *                  如果数组元素由promise对象且报错，则终止后面的内容返回，直接返回该错误结果
 * 静态race 方法： 接受一个数组， 如果有一个元素成功 不论是否是promise对象的元素成功则返回这个的结果不论成功或失败
 *                如果参数为非iterator 类型数据，则返回rejected 状态的promise对象，并其实报错
 *                如果参数为空数组，则返回pending状态的promise 对象             
 * 静态any 方法：接受一个数组，数组中有非promsie 对象 则当作成功 返回这成功结果
 *              如果有一个promise成功，则返回这个成功
 *              如果所有promsie都失败，则抛出错误     
 * 静态allSettled 方法： 接受一个数组，顺序返回所有数组的结果和状态   
 *                      如果有参数错误则报错
 */


// 定义常量的状态
const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

class MyPromise {
  constructor(executor) {
    try {
      executor(this.resolve, this.reject)
    } catch (e) {
      // 处理异常
      this.reject(e)
    }

  }
  // 状态 初始值为pending
  status = PENDING
  // 保存成功的结果
  value = undefined
  // 保存失败的原因
  reason = undefined
  // 成功的回调列表
  successCallback = []
  // 失败的回调列表
  failCallback = []
  // 生成器执行成功的方法 接受成功的结果
  // resolve 和reject 执行的时候是当作参数传递执行的，需要指定为当前实例的this执行，可以通过bind 或者箭头函数来处理
  resolve = (value) => {
    // 如果状态一旦改变 将不可修改
    if (this.status !== PENDING) return
    // 改变状态为成功
    this.status = FULFILLED
    // 设置成功的结果
    this.value = value
    // 调用存储的成功的回调
    while (this.successCallback.length) {
      this.successCallback.shift()(this.value)
    }

  }
  // 生成器执行失败的方法 接受失败的原因
  reject = (reason) => {
    // 如果状态一旦改变 将不可修改
    if (this.status !== PENDING) return
    // 设置状态未失败
    this.status = REJECTED
    // 设置失败的原因
    this.reason = reason
    // 调用存储的失败的回调
    while (this.failCallback.length) {
      this.failCallback.shift()(this.reason)
    }
  }
  // then 方法接受成功和失败的回调函数，
  // then 方法判断当前的状态为成功或者失败，分别执行成功或者失败的方法，并将成功的结果或者失败的原因作为回调函数的参数 
  then(successCallback, failCallback) {
    // 设置默认参数
    // 成功返回传入的值
    successCallback = typeof successCallback === 'function' ? successCallback : value => value
    // 继续抛出错误
    failCallback = typeof failCallback === 'function' ? failCallback : reason => { throw reason }

    // 返回新的promise对象
    const promise2 = new MyPromise((resolve, reject) => {
      const resultHandle = (callback, value) => {
        setTimeout(() => {
          // 用try catch 拦截异常
          try {
            // 回调执行的结果
            const x = callback(value)
            // 判断返回的是否自己，处理循环调用
            // 这里没有复现循环调用？？？？？？？？？
            // 只是返回的是pending 状态的promise 所以就无法进入resolve 和reject
            // 为什么加了setTimeout 就可以拿到promise2, 因为如果是同步代码这里还没有执行完 还没有返回???????
            if (x === promise2) {
              return reject(new Error('不能返回自己'))
            }
            // 判断是否是promise对象
            if (x instanceof MyPromise) {
              // 是promise 对象 返回执行的结果，或者拦截失败的异常
              x.then(resolve, reject)
            } else {
              resolve(x)
            }
          } catch (e) {
            reject(e)
          }
        })
      }
      // 判断当前promise 实例的状态
      if (this.status === FULFILLED) {
        // 当前状态为成功
        resultHandle(successCallback, this.value)
      } else if (this.status === REJECTED) {
        // 当前状态为失败
        resultHandle(failCallback, this.reason)
      } else {
        // 当前状态为pending
        // this.successCallback.push(successCallback)
        // this.failCallback.push(failCallback)
        // 为了更好的处理异常 push 一个函数 函数中来调用成功或者失败的回调
        this.successCallback.push(() => {
          resultHandle(successCallback, this.value)
        })
        this.failCallback.push(() => {
          resultHandle(failCallback, this.reason)
        })

      }
    })
    return promise2
  }
  // 静态resolve 方法
  static resolve(value) {
    // 如果是参数是一个promise 对象 直接返回该参数
    if (value instanceof MyPromise) return value
    // 返回一个fulfilled 状态的promise对象 
    return new MyPromise((resolve, reject) => {
      resolve(value)
    })
  }
  // 静态 reject 方法
  static reject(reason) {
    // 如果参数是一个promise 对象 直接返回该参数
    if (reason instanceof MyPromise) return reason
    // 返回一个rejected 状态的promise 对象
    return new MyPromise((resolve, reject) => {
      reject(reason)
    })
  }
  // finally 接受一个回调函数
  finally(callback) {
    // 调用then 并在then 的回调参数中取执行callback
    return this.then(value => {
      return MyPromise.resolve(callback(value)).then(() => value)
    }, reason => {
      return MyPromise.reject(callback(reason)).then(undefined, () => { throw reason })
    })
  }
  // catch 错误捕获
  catch(callback) {
    return this.then(undefined, reason => {
      callback(reason)
    })
  }
  // 静态all 方法
  // 接受一个数组参数 返回一个promise对象
  static all(array) {
    return new MyPromise((resolve, reject) => {
      // 判断如果是空数组 直接返回空数组的promise对象
      // 需要判断如果不是可迭代的数据类型直接报错

      if (array[Symbol.iterator]) {
        if (array.length === 0) {
          return resolve(array)
        }
        let result = []
        let index = 0;
        // 记录所有的数据
        const addData = (i, value) => {
          result[i] = value
          index++
          // 当所有数据都拿到后 改变promise 的转态为fulfilled
          if (index === array.length) {
            resolve(result)
          }
        }
        // 遍历每一个元素
        for (let i = 0; i < array.length; i++) {
          // 如果有一个元素时promise对象 则等待promise对象的结果
          if (array[i] instanceof MyPromise) {
            array[i].then(value => {
              addData(i, value)
            }, reason => {
              // 如果有错误拦截错误原因 并直接改变rejected状态
              reject(new Error(reason))
            })
          } else {
            // 如果元素为常量 直接添加结果
            addData(i, array[i])
          }
        }
      } else {
        reject(new Error('参数类型错误'))
      }
    })
  }
  // 静态方法race
  // 接受一个数组，如果有一个元素成功 不论是否是promise对象的元素成功则返回这个的结果不论成功或失败 
  // 如果是空数组 则是pending 转态 如果是非iterator 类型数据 则返回异常
  static race(array) {
    return new MyPromise((resolve, reject) => {
      if (array[Symbol.iterator]) {
        for (let i = 0; i < array.length; i++) {
          if (array[i] instanceof MyPromise) {
            array[i].then(value => {
              resolve(value)
            }, reason => {
              reject(reason)
            })
          } else {
            resolve(array[i])
          }
        }

      } else {
        reject(new Error('数据类型错误'))
      }
    })
  }
  // 静态方法any
  // 接受一个数组 如果所有元素都失败了则返回失败
  static any(array) {
    return new MyPromise((resolve, reject) => {
      let index = 0
      if (array[Symbol.iterator]) {
        if (array.length === 0) {
          return reject(new Error('all rejected'))
        }
        for (let i = 0; i < array.length; i++) {
          // 如果是常量直接忽略
          // 如果是promise 对象 返回promise对象的结果
          if (array[i] instanceof MyPromise) {
            array[i].then(value => {
              resolve(value)
            }, reason => {
              // 如果都错误了 则返回失败
              index++
              if (index === array.length) {
                reject(new Error('all rejected'))
              }
            })
          } else {
            resolve(array[i])
          }
        }
      } else {
        reject(new Error('数据类型错误'))
      }
    })
  }
  // 静态方法 allSettled
  // 接受一个数组 返回一个promise 对象
  // 不论结果是成功还是失败，都返回这结果
  static allSettled(array) {
    return new MyPromise((resolve, reject) => {
      if (array[Symbol.iterator]) {
        if (array.length === 0) {
          return resolve(array)
        }
        let result = []
        let index = 0
        const addData = (i, value, status) => {
          result[i] = {
            value,
            status
          }
          index++
          if (index === array.length) {
            resolve(result)
          }
        }
        for (let i = 0; i < array.length; i++) {
          if (array[i] instanceof MyPromise) {
            array[i].then(value => {
              addData(i, value, FULFILLED)
            }, reason => {
              addData(i, reason, REJECTED)
            })
          } else {
            addData(i, array[i], FULFILLED)
          }
        }
      } else {
        reject('参数错误')
      }
    })
  }
}







// 综合验证resolve reject then
const p1 = new MyPromise((resolve, reject) => {
  resolve('p1 验证resolve')
  // reject('p1 验证reject')
  // setTimeout(() => {
  //   resolve('p1 验证resolve 定时器')
  // }, 2000)
})
  .then(value => {
    console.log('p1-----then1--value', value)
    return 'p1-----then1--value'
  }, reason => {
    console.log('p1-----then1--reason', reason)
  })
  .then(value => {
    console.log('p1-----then2--value', value)
    return new MyPromise((resolve) => {
      resolve('p1-----then2--value-resolve')
    })
  }, reason => {
    console.log('p1-----then2--reason', reason)
  })
  .then()
  .then()
  .then(value => {
    console.log('p1-----then3--value', value)
  }, reason => {
    console.log('p1-----then3--reason', reason)
  })

// 验证静态resolve
const p2 = MyPromise.resolve('p2-----测试 静态resolve')
p2.then(value => {
  console.log('p2------then-value', value)
})


const p3 = MyPromise.resolve(new MyPromise((resolve, reject) => {
  resolve('p3------测试 静态resolve')
}))
p3.then(value => {
  console.log('p3-------then-value', value)
})

// 验证静态reject
const p4 = MyPromise.reject('p4-------测试 静态reject')
p4.then(value => {
  console.log('p4------then-value', value)
}, reason => {
  console.log('p4-------then-reason', reason)
})

const p5 = MyPromise.reject(new MyPromise((resolve, reject) => {
  reject('p5------测试 静态reject')
}))
p5.then(value => {
  console.log('p5------then-value', value)
}, reason => {
  console.log('p5------then-reason', reason)
})


// 测试finally
const p6 = new MyPromise((resolve, reject) => {
  // resolve('p6-测试  finally')
  reject('p6------测试  finally')
}).finally(value => {
  console.log('p6-------finally', value)
}).then((value) => {
  console.log('p6-------then-value', value)
}, reason => {
  console.log('p6------then-reason', reason)
})


// 测试 catch
const p7 = new MyPromise((resolve, reject) => {
  // resolve('p6-测试  finally')
  reject('p7------测试  catch')
}).then((value) => {
  console.log('p7------then1-value', value)
}, reason => {
  console.log('p7------then1-reason', reason)
  throw reason
}).catch(reason => {
  console.log('p7-------catch', reason)
}).then(value => {
  console.log('p7-------then2-value', value)
})


// 测试all
const item8 = MyPromise.resolve('p8------测试  all')
// const item8 = MyPromise.reject('p8--测试  all')
const arr8 = ['1', '2', item8]
// const arr8 = [] // 返回空数组
// const arr8 = '12' // 返回['1', '2']
const p8 = MyPromise.all(arr8).then(value => {
  console.log('p8------then1--value', value)
}, reason => {
  console.log('p8------then1--reason', reason)
})

// Promise.all(88).then(value => {
//   console.log('[]', value)
// })


const item9 = MyPromise.resolve('p9------测试 race')
const item99 = MyPromise.resolve('p9------测试222 race')
const arr9 = ['1', '2', item9, item99]
// const arr9 = ['1', '2']
const p9 = MyPromise.race(arr9).then(value => {
  console.log('p9-------then1--value', value)
}, reason => {
  console.log('p9-------then1--reason', reason)
})

// Promise.race([]).then(value => {
//   console.log('race--then1--value', value)
// }, reason => {
//   console.log('race--then1--reason', reason)
// })


const item10 = MyPromise.resolve('p10---测试 any')
const item100 = MyPromise.resolve('p10---测试222 any')
const arr10 = ['1', '2', item10, item100]
// const arr10 = ['1', '2']
const p10 = MyPromise.any(arr10).then(value => {
  console.log('p10------then1--value', value)
}, reason => {
  console.log('p10-------then1--reason', reason)
})

// Promise.any([]).then(value => {
//   console.log('any--then1--value', value)
// }, reason => {
//   console.log('any--then1--reason', reason)
// })

const item11 = MyPromise.resolve('p11---测试 allSettled')
const item111 = MyPromise.reject('p11---测试222 allSettled')
const arr11 = ['1', '2', item11, item111]
// const arr10 = ['1', '2']
const p11 = MyPromise.allSettled(arr11).then(value => {
  console.log('p11------then1--value', value)
}, reason => {
  console.log('p11-------then1--reason', reason)
})

// Promise.allSettled(arr11).then(value => {
//   console.log('allSettled--then1--value', value)
// }, reason => {
//   console.log('allSettled--then1--reason', reason)
// })



