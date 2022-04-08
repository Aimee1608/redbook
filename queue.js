// function Queue() {
//   // 属性
//   this.items = []
//   // 方法
//   //  enqueue(element) 向队列尾部添加一个或多个新的项。
//   Queue.prototype.enqueue = function (element) {
//     this.items.push(enqueue)
//   }

//   // dequeue 从队列中删除前端元素
//   Queue.prototytpe.dequeue = function () {
//     return this.items.shift()
//   }
//   // front 查看前端元素
//   Queue.prototype.front = function () {
//     return this.items[0]
//   }
//   // isEmpty查看队列是否为空
//   Queue.prototype.isEmpty = function () {
//     return !this.items.length
//   }
//   // size 查看队列中元素的个数
//   Queue.prototype.size = function () {
//     return this.items.length
//   }
//   // toString 方法
//   Queue.prototype.toString = function () {
//     return this.items.toString()
//   }
// }

// var queue = new Queue()
// queue.push(1)
// queue.push(2)
// queue.push(3)


class Queue {
  constructor() {
    // 初始化数据
    this.items = []
  }
  // 向队列末端添加元素
  enqueue(element) {
    this.items.push(element)
  }
  // 队列前端删除一个元素
  dequeue() {
    return this.items.shift()
  }
  // 反回当前队列前端的元素
  get front() {
    return this.items[0]
  }
  get isEmpty() {
    return !this.items.length
  }
  get size() {
    return this.items.length
  }
  toString() {
    return this.items.toString()
  }
  clear() {
    return this.items = []
  }
}

// 击鼓传花 
// 改进版
// 一个队列，元素从头到位依次报数
// 数到某个固定数字（如5）的时候，淘汰这个元素
// 剩余的人继续报数，数到这个固定数字的时候继续报数
function passGame(list, number) {
  // 初始化队列
  let items = new Queue()
  for (let i = 0; i < list.length; i++) {
    items.enqueue(list[i])
  }

  // 出队列 进队列 第number的时候 移出
  let item = ''
  while (!items.isEmpty) {
    for (let i = 0; i < number; i++) {
      item = items.dequeue()
      if (i < number - 1) {
        items.enqueue(item)
      }
    }
  }
  return item

}
var arr = [1, 2, 3, 4, 5];
var item = passGame(arr, 3)
console.log(item)


// 优先级队列
// 挨个和第一个比较
class PriorityQueue {
  constructor() {
    this.items = []
  }
  enqueue(element, priority) {
    const item = {
      element,
      priority
    }
    for (let i = 0; i < this.items.length; i++) {

      if (item.priority < this.items[i].priority) {
        this.items.splice(i, 0, item)
        return;
      }
    }
    this.items.push(item)

  }
  dequeue() {
    return this.items.shift()
  }
  // 反回当前队列前端的元素
  get front() {
    return this.items[0]
  }
  get isEmpty() {
    return !this.items.length
  }
  get size() {
    return this.items.length
  }
  toString() {
    let string = ''
    for (let i = 0; i < this.items.length; i++) {
      string += this.items[i].element + '-' + this.items[i].priority + ' '
    }
    // return this.items.toString()
    return string
  }
  clear() {
    return this.items = []
  }
}

const list = new PriorityQueue()
list.enqueue('a', 4)
list.enqueue('b', 5)
list.enqueue('c', 2)
list.enqueue('e', 3)
console.log(list.toString())