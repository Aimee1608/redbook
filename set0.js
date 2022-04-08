// 集合 对象版
class Set {
  constructor() {
    this.items = {}
  }
  // 向集合添加一个新的项
  add(value) {
    if (this.items.hasOwnProperty(value)) {
      return false
    }
    this.items[value] = value
    return true
  }
  // 从集合中移除一个值
  remove(value) {
    if (!this.items.hasOwnProperty(value)) {
      return false
    }
    delete this.items[value]
    return true
  }
  // 如果值在集合中返回true 否则返回false
  has(value) {
    return this.items.hasOwnProperty(value)
  }
  // 移除集合中的所有项
  clear(value) {
    return this.items = {}
  }
  get size() {
    return Object.keys(this.items).length
  }
  values() {
    return Object.values(this.items)
  }
}

const newSet = new Set()
newSet.add(1)
newSet.add(2)
newSet.add(1)

console.log('values  ', newSet.values())

newSet.has(1)

console.log('has  ', newSet.has(1))

console.log('size  ', newSet.size)
newSet.add(3)
newSet.add(4)

console.log('remove  ', newSet.remove(4))

console.log('values  ', newSet.values())

