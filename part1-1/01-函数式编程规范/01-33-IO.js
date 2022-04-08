// IO 函子
// IO 函子中的_value 是一个函数，这里是吧函数作为值来处理
// IO 函子可以把不存的动作存储到_value中
const fp = require('lodash/fp')
class IO {
  static of(value) {
    return new IO(function () {
      return value
    })
  }
  constructor(fn) {
    this._value = fn
  }
  map(fn) {
    return new IO(fp.flowRight(fn, this._value))
  }
}

// 调用
let r = IO.of(process).map(p => p.execPath)
console.log(r, r._value())