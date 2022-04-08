// 一个rejected 状态的promise实例执行then 默认会返回一个新的fulfilled 状态的promise实例
// rejected 状态的promise实例不会执行onRejected 回调
// 当错误被onRejected捕获后 不会再被catch 方法捕获

// 如果有错误需要后面也能捕获到 需要逐层向后抛出错误
Promise.reject()
  .then((value) => {
    console.log('----------------------3-------------------')
    console.log('3-----------111111', value)
    return value
  }, err => {
    console.log('3----------111111-err', err)
  })
  .then((value) => {
    console.log('3---------22222', value)
    throw new Error('then3-2222--error')
  }, err => {
    console.log('3--------22222-err', err)
  })
  .then((value) => {
    console.log('3----------3333333', value)
  }, err => {
    console.log('3----------3333333-err', err)
  })
  .then((value) => {
    console.log('3----------44444', value)
  }, err => {
    console.log('3---------44444-err', err)
  }).catch(err => {
    console.log('3-----------catch---err', err)
  })
