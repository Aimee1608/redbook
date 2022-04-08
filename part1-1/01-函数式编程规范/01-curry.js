// 函数柯里化
const _ = require('lodash')
function checkAge(age) {
  let min = 18
  return age >= min
}


// 普通的纯函数
function checkAge(min, age) {
  return age >= min
}
console.log(checkAge(18, 20))
console.log(checkAge(18, 24))
console.log(checkAge(22, 20))

// 问题
// 18频繁调用
// 第一个函数频繁使用，可以返回先确定第一个参数后的函数
function checkAge2(min) {
  return function (age) {
    return age >= min
  }
}

// ES6
const checkAge3 = min => (age => age > min)

let checkAge18 = checkAge3(18)
let checkAge22 = checkAge3(22)

console.log(checkAge18(20))
console.log(checkAge18(24))
console.log(checkAge22(20))

// lodash中的柯里化函数
// _.curry(func)
function getSum(a, b, c) {
  return a + b + c
}

const curried = _.curry(getSum)
console.log(curried(1, 2, 3))
console.log(curried(1)(2, 3))
console.log(curried(1)(2)(3))

// 柯里化案例
''.match(/\s+/g)
''.match(/\d+/g)


const match = _.curry(function (reg, str) {
  return str.match(reg)
})
const haveSpace = match(/\s+/g)
const haveNumber = match(/\d+/g)
console.log(haveSpace('hello world'))

console.log(haveNumber('123world'))
console.log(haveNumber('world'))

const filter = _.curry(function (func, array) {
  return array.filter(func)
})

const filter2 = _.curry((func, array) => array.filter(func))

const arr = ['aimme jiang', 'aimee']
console.log(filter(haveSpace, arr))

const findSpace = filter(haveSpace)
console.log(findSpace(arr))


// curry实现
// 1、参数相同时 立刻调用
// 2、参数不相同时，等待参数传完再调用

function curry(func) {
  return function curriedFn(...args) {
    // 判断实参和形参的个数
    // 补充：func 中的形参个数如果是确定的如func(a, b)则其length 为2 如果为func(...values) 则其length为0
    if (args.length < func.length) {
      return function () {
        return curriedFn(...args, ...Array.from(arguments))
      }
    }
    // 这个地方不用apply吗 为什么
    // return func.apply(this, args)
    return func(...args)
  }
}


const curried2 = curry(getSum)
console.log(curried2(1, 2, 3))
console.log(curried2(1)(2, 3))
console.log(curried2(1)(2)(3))