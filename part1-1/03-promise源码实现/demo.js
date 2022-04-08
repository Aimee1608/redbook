const MyPromise = require('./01-promise类核心原理')
const MyPromise3 = require('./01-promise-then链式调用')

// const promise = new MyPromise((resolve, reject) => {
//   resolve('成功')
// })
//   .then(res => {
//     console.log('res', res)
//   })

const promise3 = new MyPromise3((resolve, reject) => {
  resolve('成功')
  // reject('失败')
})
var promise33 = promise3.then(res => {
  console.log('res--then1', res)
  // throw new Error('throw error')

  return promise33
}, reason => {
  console.log('reason', reason)
})

promise33.then(value => {
  console.log('value', value)
}, reason => {
  console.log('reason', reason.message)
})

//   .then(res => {
//   console.log('res--then2', res)
// })

// const promise0 = new Promise((resolve, reject) => {
//   resolve(100)
// })

// const p1 = promise0.then((value) => {
//   console.log(value)
//   return p1
// })


