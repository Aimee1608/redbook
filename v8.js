
const memory = process.memoryUsage()
console.log(memory)
const getMemory = () => {
  const memory = process.memoryUsage()
  // console.log(memory)
  console.log(`heapTotal: ${(memory.heapTotal / 1024 / 1024).toFixed(2)}   heapUsed: ${(memory.heapUsed / 1024 / 1024).toFixed(2)}`)
}

const size = 20 * 1024 * 1024
let count = 0;
const useMem = () => {
  var arr = new Array(size)
  console.log(count++);
  return arr
}
function fun() {
  let arr1 = new Array(size)
  let arr2 = new Array(size)
  let arr3 = new Array(size)
  let arr4 = new Array(size)
  let arr5 = new Array(size)
}

fun()

var total = []
for (let i = 0; i < 12; i++) {
  getMemory()
  total.push(useMem())
}

console.log('success')