/**
 * let
 * 拥有块级作用域
 * 全局声明不会挂载在window对象上
*/

// var elements = [{}, {}, {}]
// for (var i = 0; i < elements.length; i++) {
//   console.log(i)
//   elements[i].onclick = function () {
//     console.log(i)
//   }
// }

var elements = [{}, {}, {}]
for (var i = 0; i < elements.length; i++) {
  console.log(i)
  elements[i].onclick = (function (i) {
    return function () {
      console.log(i)
    }
  })(i)
}

