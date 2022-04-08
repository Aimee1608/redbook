
// 栈的实现

class Stack {
  constructor() {
    this.list = []
  }
  // 入栈 向栈顶压入一个元素
  push(element) {
    this.list.push(element)
  }
  // 出栈 从栈顶移出一个元素
  pop() {
    return this.list.pop()
  }
  // 栈长度
  get size() {
    return this.list.length
  }
  // 返回顶端栈元素
  get peek() {
    return this.list[this.list.length - 1]
  }
  // toString 方法
  toString() {
    let string = ''
    this.list.forEach(item => {
      string += item + ''
    })
    return string
  }
  get isEmpty() {
    return !this.list.length
  }
  clear() {
    this.list = []
  }
}
const s = new Stack()
s.push(2)
s.push(3)
s.push(4)
s.size
s.toString()


function decToOther(number, base) {
  let stack = new Stack()
  while (number > 0) {
    stack.push(number % base)
    number = Math.floor(number / base)
  }
  let result = ''
  while (!stack.isEmpty) {
    result += stack.pop()
  }
  return result
}
decToOther(100, 2)
console.log(decToOther(100, 8))