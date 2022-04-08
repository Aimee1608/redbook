// 高阶函数-函数作为参数

function forEach(array, fn) {
  let length = array.length
  for (let i = 0; i < length; i++) {
    fn(array[i], i, array);
  }
}

function filter(array, fn) {
  let length = array.length
  const results = []
  for (let i = 0; i < length; i++) {
    const res = fn(array[i], i, array)
    if (res) {
      results.push(array[i])
    }
  }
  return results
}

// 函数作为返回值
function makeFn() {
  let msg = 'hello function'
  return function () { console.log(msg) }
}
const fn = makeFn()

// once 函数
function once(fn) {
  let init = false
  return function () {
    if (!init) {
      init = true
      return fn.applay(this, arguments)
    }
  }
}

let pay = once(function (money) {
  console.log(`支付: ${money} RMB`)
})

const map = (array, fn) => {
  let results = []
  for (let value of array) {
    results.push(fn(value))
  }
  return results
}

