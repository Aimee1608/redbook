// 纯函数和不纯函数
// 纯函数：
// 相同的输入能得到相同的输出
// slice 和splice


let array = [1, 2, 3, 4, 5]

// 纯函数 slice 
console.log(array.slice(0, 3))
console.log(array.slice(0, 3))
console.log(array.slice(0, 3))

// 不纯的函数
// 相同的输入不能得到相同的输出
console.log(array.splice(0, 3))
console.log(array.splice(0, 3))
console.log(array.splice(0, 3))


// 纯函数demo
function getSum(n1, n2) {
  return n1 + n2
}
console.log(getSum(1, 2))
console.log(getSum(1, 2))
console.log(getSum(1, 2))