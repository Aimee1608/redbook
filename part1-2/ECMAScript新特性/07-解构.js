const arr = [100, 200, 300]
const [foo, ...rest] = arr
console.log('rest', rest)

const [foo1, bar2, baz, b = 'other'] = arr
console.log('b', b)

const obj = { name: 'aimee', age: 18 }
const { name } = obj
console.log('name', name)

console.log(...arr)

function get(a, ...b) {
  console.log('get', b)
}
get(...arr)