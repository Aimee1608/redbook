// 错误捕获
// 会全局捕获到没有被捕获到的错误
// 没有onRejected 或者catch 的错误
// 参数reason 错误的原因 promise 为错误的promise对象

// window.addEventListener('unhandledrejection', function (event) {
//   const { reason, promise } = event;
//   console.log(reason, promise)
// })




// node 中
process.on('unhandledRejection', (reason, promise) => {
  console.log('process---error')
  console.log(reason, promise)
})

Promise.resolve().then(value => {
  throw new Error('error----resolve')
})

Promise.reject('error-reject')

Promise.reject('error-reject-catch').catch(err => {
  console.log(err)
})