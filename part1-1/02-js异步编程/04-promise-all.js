// promise 静态方法
// all
// 接收一个Promise数组，数组中如有非Promise项，则此项当做成功
// 如果所有Promise都成功，则返回成功结果数组
// 如果有一个Promise失败，则返回这个失败结果


// Promise.resolve() 如果参数为一个 fulfilled 的promise 对象 返回的结果就是原参数的promise
const arr = [1, 2, 3]
Promise.all(arr.map(item => Promise.resolve(item * 2))).then(value => {
  console.log(value)
})


Promise.all(arr.map(item => {
  if (item <= 2) {
    return Promise.resolve(item * 2)
  } else {
    return Promise.reject('大于2')
  }
}
)).then(value => {
  console.log('value', value)
}, err => {
  console.log('err', err)
})