// 集合 对象版

interface ISetItems{
  [propName: string]: string
}
interface ISet{
  items: ISetItems;
  add(value: string): boolean;
  remove(value: string): boolean;
  has(value: string): boolean;
  clear():void;
  values(): string[];
  size: number
}

class MySet implements ISet {
  items: ISetItems
  constructor() {
    this.items = {}
  }
  // 向集合添加一个新的项
  add(value: string): boolean{
    if (this.items.hasOwnProperty(value)) {
      return false
    }
    this.items[value] = value
    return true
  }
  // 从集合中移除一个值
  remove(value: string): boolean {
    if (!this.items.hasOwnProperty(value)) {
      return false
    }
    delete this.items[value]
    return true
  }
  // 如果值在集合中返回true 否则返回false
  has(value: string): boolean{
    return this.items.hasOwnProperty(value)
  }
  // 移除集合中的所有项
  clear() {
    this.items = {}
  }
  get size(){
    return Object.keys(this.items).length
  }
  values(){
    return Object.values(this.items)
  }
}

const newSet2 = new MySet()
newSet2.add('1')
newSet2.add('2')
newSet2.add('1')

console.log('values  ', newSet2.values())

newSet2.has('1')

console.log('has  ', newSet2.has('1'))

console.log('size  ', newSet2.size)
newSet2.add('3')
newSet2.add('4')

console.log('remove  ', newSet2.remove('4'))

console.log('values  ', newSet2.values())

// 并集
function getAll(setA: ISet, setB: ISet): ISet {
  const newAllSet = new MySet()
  setA.values().forEach((item) => {
    newAllSet.add(item)
  })
  setB.values().forEach((item) => {
    newAllSet.add(item)
  })
  return newAllSet
}

// 交集
function getCommon(setA: ISet, setB: ISet): ISet {
  const newCommonSet = new MySet()
  setA.values().forEach(item => {
    if (setB.has(item)) {
      newCommonSet.add(item)
    }
  })
  return newCommonSet
}

// 差集
function getLeft(setA: ISet, setB: ISet): ISet {
  const newLeftSet = new MySet()
  setA.values().forEach(item => {
    if (!setB.has(item)) {
      newLeftSet.add(item)
    }
  })
  return newLeftSet
}

// 子集
function isChild(setA: ISet, setB: ISet): boolean  {
  const result = setA.values().every(item => {
    return setB.has(item)
  })
  return result
}

const setA = new MySet()
setA.add('a')
setA.add('b')
setA.add('c')
setA.add('d')
setA.add('e')

const setB = new MySet()
setB.add('a')
setB.add('b')
setB.add('c')
setB.add('d')

console.log('并集  ', getAll(setA, setB))

console.log('交集  ', getCommon(setA, setB))

console.log('差集  ', getLeft(setA, setB))

console.log('子集  ', isChild(setA, setB))