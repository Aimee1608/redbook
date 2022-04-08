// promise 静态方法
// race
// 接收一个Promise数组，数组中如有非Promise项，则此项当做成功
// 哪个Promise最快得到结果，就返回那个结果，无论成功失败


const arr = [1, 2, 3]
Promise.race(arr.map(item => Promise.resolve(item * 2))).then(value => {
  console.log(value)
})


Promise.race(arr.map(item => {
  if (item <= 2) {
    return Promise.resolve(item * 2)
  } else {
    return Promise.reject('大于2')
    // Promise.resolve(new Error('小于2'))
  }
}
)).then(value => {
  console.log('err-value', value)
}, err => {
  console.log('err', err)
}).catch(err => {
  console.log('err-catch', err)
})