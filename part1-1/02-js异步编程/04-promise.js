// promise
// 状态：
// pending
// fufilled
// rejected


// promise 的pending 状态一旦被改变 将无法再修改
const promise = new Promise((resolve, reject) => {
  resolve(100)
  reject(new Error('promise rejected')) // 不会执行
})

console.log('promise', promise)


Promise.resolve()
  .then((value) => {
    // promise 的resolve 默认会返回一个新的fufilled状态的promise 实例
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


// 如果then 中有return 返回 且不是 promise 对象，将不会向后执行
Promise.resolve(1).then(value => {
  console.log('----------------------2-------------------')
  console.log('2---------then1-value', value)
  return Promise.resolve(3)
}).then(value => {
  console.log('2----------then2-value', value)
}).then(value => {
  console.log('2----------then3-value', value)
}).then(value => {
  console.log('2----------then4-value', value)
})



Promise.reject()
  .then((value) => {
    console.log('----------------------3-------------------')
    console.log('3-----------111111', value)
  }, err => {
    console.log('3----------111111-err', err)
  })
  .then((value) => {
    console.log('3---------22222', value)
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

// promise 封装ajax

function ajax(url) {
  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest()
    xhr.open('GET', url)
    xhr.responseType = 'json'
    xhr.onload = function () {
      if (this.status === 200) {
        resolve(this.response)
      } else {
        reject(new Error(this.statusText))
      }
    }
    xhr.send()
  })
}