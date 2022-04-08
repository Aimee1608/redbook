// 函数组合演示
// 结合律
const _ = require('lodash')
// 多个函数会组合生成一个函数
function compose(f, g) {
  return function (value) {
    return f(g(value))
  }
}

function reverse(array) {
  return array.reverse()
}

function first(array) {
  return array[0]
}

const last = compose(first, reverse)
const arr = [1, 2, 3, 4]
console.log(last(arr))

const toUpper = s => s.toUpperCase()

// lodash 中的函数组合的方法 _.flowRight()
// 右侧的参数最先调用
const f = _.flowRight(toUpper, first, reverse)
console.log(f(['one', 'two', 'three']))

// 实现lodash中的flowRight
function compose2(...args) {
  return function (value) {
    // reduce 知识点 array.reduce((total, current, currentIndex, arr)=>{}, initailValue)
    return args.reverse().reduce((total, current) => {
      return current(total)
    }, value)
  }
}

const compose3 = (...args) => (value => args.reverse().reduce((total, current) => current(total), value))


const f2 = compose2(toUpper, first, reverse)

console.log(f2(['one', 'two', 'three']))

const f3 = compose3(toUpper, first, reverse)

console.log(f3(['one', 'two', 'three']))


// 结合律
// 先组合前两个，或者先组合后两个
const f4 = _.flowRight(_.toUpper, _.first, _.reverse)
console.log(f4(['one', 'two', 'three']))

const f5 = _.flowRight(_.toUpper, _.flowRight(_.first, _.reverse))
console.log(f5(['one', 'two', 'three']))


// 调试
// 函数组合调试
const split = _.curry((sep, str) => _.split(str, sep))

const join = _.curry((sep, array) => _.join(array, sep))

const map = _.curry((fn, array) => _.map(array, fn))

const log = v => {
  console.log(v)
  return v
}

const trace = _.curry((tag, v) => {
  console.log(tag, v)
  return v
})

const f6 = _.flowRight(join('-'), log, map(_.toLower), trace('split 之后'), split(' '))

console.log('f6', f6('NEVER SAY DIE'))