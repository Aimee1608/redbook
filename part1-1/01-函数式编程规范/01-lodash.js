// lodash


const _ = require('lodash')
const array = ['jack', 'tom', 'lucy', 'kate']
// 第一个元素
console.log(_.first(array))
// 最后一个元素
console.log(_.last(array))
// 第一个元素转大写
console.log(_.toUpper(_.first(array)))

// 反转数组 改变原数组
console.log(_.reverse(array))
console.log(_.reverse(array))
// 遍历数组
const r = _.each(array, (item, index) => {
  console.log(item, index)
})
console.log(r)


// 纯函数的好处 
// 可缓存

// 记忆函数
console.log('-----------memoize----------')
// memoize 函数

function getArea(r) {
  console.log('r', r)
  return Math.PI * r * r
}
let getAreaWithMemory = _.memoize(getArea)
console.log(getAreaWithMemory(4))
console.log(getAreaWithMemory(4))

console.log(getAreaWithMemory(4))

// memoize 实现
function memoize(f) {
  let cache = {}
  return function () {
    let key = JSON.stringify(arguments)
    if (cache.hasOwnProperty(key)) {

    }
    return cache[key] = cache.hasOwnProperty(key) ? cache[key] : f.apply(this, arguments)
  }
}


let getAreaWithMemory2 = memoize(getArea)
console.log(getAreaWithMemory2(5))
console.log(getAreaWithMemory2(5))