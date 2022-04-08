
// 如果then 中有return 返回 且不是 fulfilled 状态或者rejected 状态的promise 对象是pending状态的promise，将不会向后执行
// 如果有return 为非promise 对象 也会默认返回一个fulfilled 状态的promsie 对象，并将return的结果作为参数向后传递
// 只有 fulfilled和  rejected 状态的promise 实例 才会有then 方法
Promise.resolve(1).then(value => {
  console.log('----------------------2-------------------')
  console.log('2---------then1-value', value)
  return 2
  // return new Promise(() => { })
  // return Promise.resolve(3)
}).then(value => {
  console.log('2----------then2-value', value)
}).then(value => {
  console.log('2----------then3-value', value)
}).then(value => {
  console.log('2----------then4-value', value)
})

// Promise.resolve(1).then(value => {
//   console.log('----------------------2-------------------')
//   console.log('2---------then1-value', value)
//   // return new Promise(() => { })
//   return Promise.resolve(3)
// }).then(value => {
//   console.log('2----------then2-value', value)
// }).then(value => {
//   console.log('2----------then3-value', value)
// }).then(value => {
//   console.log('2----------then4-value', value)
// })