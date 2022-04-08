// 双向链表
class DoublyLinkedList {
  constructor() {
    this.head = null
    this.tail = null
    this.length = 0
  }
  // 向链表尾部添加一个新的项
  append(element) {
    const newNode = {
      prev: null,
      data: element,
      next: null
    }
    if (this.length === 0) {
      this.head = newNode
    } else {
      let current = this.tail
      current.next = newNode
      newNode.prev = current
    }
    this.tail = newNode
    this.length++
    // console.log(this.head)
  }
  // 向链表的特定位置插入一个新的项
  insert(position, element) {
    // 判断插入位置是否合法
    if (position < 0 || position > this.length) return false
    // 创建新node
    const newNode = {
      prev: null,
      data: element,
      next: null
    }
    // 如果超出长度 则直接追加
    if (position === this.length) {
      if (this.tail && this.tail.next) {
        this.tail.next = newNode
      }
      newNode.prev = this.tail

    } else {
      // 判断从前遍历 还是从后遍历
      const forward = position < (this.length - 1) / 2
      let index = 0;
      let current = null;

      // 找到当前位置的元素
      if (forward) {
        // 从前往后找对应的位置
        current = this.head
        while (index++ < position) {
          current = current.next
        }
      } else {
        // 从后往前找
        current = this.tail
        index = this.length - 1
        while (index-- > position) {
          current = current.prev
        }
      }
      // 设置新节点的prev 为当前位置节点的prev
      newNode.prev = current.prev
      // 设置新节点的next 为当前位置节点
      newNode.next = current
      // 如果当前位置节点不是第一个位置，则设置当前位置的前一个位置的节点的next 为新节点
      if (current.prev) {
        current.prev.next = newNode
      }
      // 设置当前位置的节点的prev为新节点
      current.prev = newNode
    }
    // 如果位置为0，则改变head指向
    if (position === 0) {
      this.head = newNode
    }
    // 如果位置为末尾元素或则新加元素 改变tail指向
    if (position === this.length - 1 || position === this.length) {
      this.tail = newNode
    }
    this.length++
    // console.log(this.head)
  }
  // 获取对应位置的元素
  get(position) {
    const current = this.getCurrent(position) || { data: null }
    return current.data
  }
  getCurrent(position) {
    if (!this.vaildPosition(position)) return null
    const forward = position < (this.length - 1) / 2
    let index = 0;
    let current = null
    if (forward) {
      current = this.head
      while (index++ < position) {
        current = current.next
      }
    } else {
      console.log('back', this.tail)
      index = this.length - 1;
      current = this.tail
      while (index-- > position) {
        current = current.prev

      }
    }
    return current
  }
  // 返回元素在列表中额索引，如果列表中没有该元素 则返回-1
  indexOf(element) {
    let index = 0;
    let current = this.head;
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
  updated(position, element) {
    const current = this.getCurrent(position)
    if (current) {
      current.data = element
      return true
    }
    return false
  }
  // 移出某个位置的元素
  removeAt(position) {
    if (!this.vaildPosition(position)) return false
    if (position === 0) {
      this.head = this.head.next
      this.head.prev = null
      if (this.length === 1) {
        this.tail = null
      }
    } else if (position === this.length - 1) {
      this.tail = this.tail.prev
      this.tail.next = null
    } else {
      let forward = position < (this.length - 1) / 2
      let index = 0;
      let current = null;
      if (forward) {
        current = this.head
        while (index++ < position) {
          current = current.next
        }
      } else {
        current = this.tail
        index = this.length - 1
        while (index-- > position) {
          current = current.prev
        }
      }
      const previous = current.prev
      const next = current.next
      previous.next = next
      next.prev = previous
      // 这样会引用死循环报错
      // current.prev = current.next
      // current.next.prev = current.prev
    }
    this.length--
    return true
  }
  // 从链表中移除一项
  remove(element) {
    let index = 0;
    let current = this.head;
    while (index++ < this.length) {
      if (current.data === element) {
        return index
      }
      current = current.next
    }
    current.prev = current.next
    if (index === 0) {
      this.head = this.head.next
    }
    if (index === this.length - 1) {
      this.tail === this.tail.prev
    }
    this.length--
  }
  // 验证位置 是否合法
  vaildPosition(position) {
    return !(position < 0 || position > this.length)
  }
  // 链表中不包含任何元素，返回true, 否则返回false
  get isEmpty() {
    return !this.length
  }
  get size() {
    return this.length;
  }
  // 输出链表中的元素
  toString() {
    let str = ''
    let current = this.head
    while (current) {
      str += current.data + ' '
      current = current.next
    }
    return str
  }
  // 返回正向遍历的节点字符串形式
  forwardString() {
    return this.toString()
  }
  backwardString() {
    let str = ''
    let current = this.tail
    while (current) {
      str += current.data + ' '
      current = current.prev
    }
    return str
  }
}

let linked = new DoublyLinkedList()
linked.append(0)
linked.append(1)
linked.append(2)
linked.append(3)
linked.append(4)
console.log('toString', linked.toString())


console.log('indexOf 0', linked.indexOf(3))
console.log('toString', linked.toString())
console.log('backwardString ', linked.backwardString())

console.log('get  2', linked.get(1))

console.log('removeAt 3', linked.removeAt(3))
console.log('toString', linked.toString())

console.log('removeAt 3', linked.removeAt(3))
console.log('toString', linked.toString())

console.log('insert  0', linked.insert(0, 1000))
console.log('toString', linked.toString())

console.log('insert  4', linked.insert(1, 100))
console.log('toString', linked.toString())

console.log('insert  4', linked.insert(2, 200))
console.log('toString', linked.toString())

console.log('insert  4', linked.insert(3, 300))
console.log('toString', linked.toString())

console.log('insert  4', linked.insert(4, 400))
console.log('toString', linked.toString())

console.log('insert  4', linked.insert(5, 500))
console.log('toString', linked.toString())

console.log('insert  4', linked.insert(7, 700))
console.log('toString', linked.toString())

console.log('insert  4', linked.insert(9, 900))
console.log('toString', linked.toString())

console.log('insert  4', linked.insert(11, 1100))
console.log('toString', linked.toString())

