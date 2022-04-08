// 防抖
function fn(callback, time) {
  let timer = null
  return function (...args) {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      callback.apply(this, args)
      clearTimeout(timer)
    }, time)
  }
}

// 节流
function fn2(callback, time) {
  let last = 0;
  return function (...args) {
    const now = new Date().getTime()
    if (now - last < time) {
      return
    }
    callback.apply(this, args)
    last = now;
  }
}

function fn3(callback, time) {
  let timer = null
  let first = ture
  return function (...args) {
    if (timer) return
    timer = setTimeout(() => {
      callback.apply(this, args)
      clearTimeout(timer)
    }, time)
  }
}

function fn4(left, right) {
  if (left.__proto__ === null) {
    return false
  }
  if (left.__proto__ === right.prototype) {
    return true
  } else {

    return fn4(left.__proto__, right)

  }
}

class C { }
class B extends C { }
const a = new B
// console.log(fn4(a, C))
console.log(a instanceof C)



console.log(1)


setTimeout(() => {

  console.log(2)

  new Promise((resolve) => {

    resolve(3)

  }).then((res) => {

    console.log(res)

  })

})


new Promise((resolve) => {

  console.log(4)

  resolve(5)

}).then((res) => {

  console.log(res)

})


setTimeout(() => {

  console.log(6)

})


console.log(7)

// 1
// 4
// 7
// 5

//2
// 3
// 6


const api = [url1, url2, url3]

function get(url) {
  return new Promise((resolve, reject) => {
    resolve(url)
  })
}

get(url1).then(res => get(url2)).then(res => get(url3))


let p = new Promise((resolve, reject) => {
  resolve()
})
for (let i = 0; i < api.length; i++) {

  p = p.then(res => get(api[i]))
}

