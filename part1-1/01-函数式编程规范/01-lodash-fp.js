
// fp 模块 提供了使用的函数式编程友好的方法
// fp 函数优先 数据滞后 已经被柯里化的
// lodash 数据优先 函数滞后
const _ = require('lodash')
const fp = require('lodash/fp')

const f = fp.flowRight(fp.join('-'), fp.map(fp.toLower), fp.split(' '))
console.log('f', f('NEVER SAY DIE'))
const map = _.curry((fn, array) => _.map(array, fn))
// lodash 和 lodash/fp 模块中map 方法的区别

console.log(_.map(['12', '8', '10'], parseInt))
// 调用过程 parseInt 会接受到三个参数
// parseInt('12', 0, array)
// parseInt('8', 1, array)
// parseInt('10', 2, array)
function parseInt2(str) {
  return parseInt(str)
}
console.log(_.map(['12', '8', '10'], parseInt2))

console.log(map(parseInt, ['12', '8', '10']))


console.log(fp.map(fp.toUpper)(['a', 'b', 'c']))
console.log(fp.map(fp.toUpper, ['a', 'b', 'c']))


console.log(fp.map(parseInt, ['12', '8', '10']))