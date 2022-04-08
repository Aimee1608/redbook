
// promise 的resolve 默认会返回一个新的fulfilled状态的promise 实例
// 新的fulfilled 状态的promise的then 也会默认进去到onResolved 回调
Promise.resolve()
  .then((value) => {
    console.log('----------------------1-------------------')
    console.log('1------111111', value)
  })
  .then((value) => {
    console.log('1-------22222', value)
  })
  .then((value) => {
    console.log('1--------3333333', value)
  })
  .then((value) => {
    console.log('1-------44444', value)
  })

