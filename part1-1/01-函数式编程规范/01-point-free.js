// point free
// 不需要指明处理的数据
// 只需要合成运算过程
// 需要定义一些辅助的基本运算函数
const fp = require('lodash/fp')

// Hello   World => hello_world
const f = fp.flowRight(fp.replace(/\s+/g, '_'), fp.toLower)

console.log('f', f('Hello   World'))

// world wild web => W.W.W

const firstLetterToUpper = fp.flowRight(fp.join('.'), fp.map(fp.flowRight(fp.first, fp.toUpper)), fp.split(' '))
console.log('firstLetterToUpper', firstLetterToUpper('world wild web'))
