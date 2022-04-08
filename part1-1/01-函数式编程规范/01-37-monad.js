// monad 函子
// 可以变扁的pointed 函子
// 一个函子如果具有join 和of 两个方法并遵守一些定律 就是一个monad
const fs = require('fs')
const fp = require('lodash/fp')
// class IO {
//   static of(value) {
//     return new IO(function () {
//       return value
//     })
//   }
//   constructor(fn) {
//     this._value = fn
//   }
//   map(fn) {
//     return new IO(fp.flowRight(fn, this._value))
//   }
// }

// let readFile = function (filename) {
//   return new IO(function () {
//     return fs.readFileSync(filename, 'utf-8')
//   })
// }
// let print = function (x) {
//   return new IO(function () {
//     console.log(x)
//     return x
//   })
// }

// let cat = fp.flowRight(print, readFile)
// // IO(IO(x))
// let r = cat('package.json')._value()._value()

// console.log(r)


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
  join() {
    return this._value()
  }
  flatMap(fn) {
    return this.map(fn).join()
  }
}

let readFile = function (filename) {
  return new IO(function () {
    return fs.readFileSync(filename, 'utf-8')
  })
}
let print = function (x) {
  return new IO(function () {
    console.log(x)
    return x
  })
}

// IO(IO(x))
let r = readFile('package.json')
  // .map(x => x.toUpperCase())
  .map(fp.toUpper)
  .flatMap(print)
  .join()

console.log(r)
