// 链表
class LinkedList {
  constructor() {
    this.length = 0
    this.head = null
  }
  // 向列表尾部添加一个新的项
  append(element) {
    const newNode = {
      data: element,
      next: null
    }
    if (this.length === 0) {
      this.head = newNode
    } else {
      let current = this.head
      while (current.next) {
        current = current.next
      }
      current.next = newNode
    }
    console.log(this.head)
    this.length++
  }
  // 向列表的特定位置插入一个新的项
  insert(position, element) {
    if (position >= 0 && position <= this.length) {
      const newNode = {
        data: element,
        next: null
      }
      let index = 0
      let previous = null
      let current = this.head
      if (position === 0) {
        newNode.next = this.head
        this.head = newNode
      } else {
        while (index++ < position) {
          previous = current
          current = previous.next
        }
        newNode.next = current
        previous.next = newNode
      }
      console.log('this.head', this.head)
      this.length++
      return true
    }
    return false

  }
  // 获取对应位置的元素
  get(position) {
    let current = this.getCurrent(position) || { data: null }
    return current.data
  }
  // 返回元素在列表中的索引，如果列表中没有该元素则返回-1
  indexOf(element) {
    let current = this.head
    let index = 0

    while (index < this.length) {

      if (current && current.data === element) {
        return index
      }
      current = current.next
      index++
    }

    return -1
  }
  // 修改某个位置的元素
  update(position, element) {
    let current = this.getCurrent(position)
    if (current) {
      current.data = element
    }
  }
  vaildPosition(position) {
    return !(position < 0 || position > this.length)
  }
  getCurrent(position) {
    if (!this.vaildPosition(position)) return null
    let current = this.head
    let index = 0
    while (index++ < position) {
      current = current.next
    }
    return current
  }
  // 从列表的特定位置移出一项
  removeAt(position) {
    if (!this.vaildPosition(position) || this.length <= 0) return null
    if (position === 0) {
      this.head = this.head.next
      this.length--
    } else {
      let index = 0
      let previous = null
      let current = this.head
      let next = current.next
      while (index++ < position) {
        previous = current
        current = previous.next
        next = current.next
      }
      previous.next = next
      this.length--
    }
    return null
  }
  // 从列表中移出一项
  remove(element) {
    let index = this.indexOf(element)
    if (index !== -1) {
      this.removeAt(index)
    }
  }
  get size() {
    return this.length
  }
  get isEmpty() {
    return !this.length
  }
  toString() {
    let current = this.head
    let string = ''
    while (current) {
      string += current.data + ' '
      current = current.next
    }
    return string
  }
}

const link = new LinkedList()
link.append(1)
link.append(2)
link.append(3)
link.append(4)

console.log('toString', link.toString())

console.log('get0', link.get(0))

console.log('get1', link.get(1))


console.log('indexOf 3', link.indexOf(3))

console.log('indexOf -2', link.indexOf(-2))

console.log('insert', link.insert(0, 100))

console.log('toString', link.toString())

console.log('insert', link.insert(4, 200))
console.log('toString', link.toString())

console.log('removeAt', link.removeAt(0))
console.log('toString', link.toString())


console.log('removeAt', link.removeAt(1))
console.log('toString', link.toString())

console.log('remove', link.remove(200))
console.log('toString', link.toString())


console.log('toString', link.toString())