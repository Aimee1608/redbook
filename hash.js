// 哈希函数
// 将字符串转成比较大的数字：hashCode
// 将大的数字hashCode 压到数组范围（大小）之内
function hashFunc(str, size) {
  // 定义hashCode 变量
  var hashCode = 0
  // 霍纳算法，来计算hashCode 的值
  // cats -> Unicode 编码
  for (let i = 0; i < str.length; i++) {
    hashCode = 37 * hashCode + str.charCodeAt(i)

  }
  // 取余操作
  const index = hashCode % size
  return index
}

// 测试哈希函数

console.log(hashFunc('abc', 7))
console.log(hashFunc('abcd', 7))
console.log(hashFunc('abcde', 7))


// 哈希表实现
// 采用链地址法
class HashTable {
  constructor() {
    this.storage = []
    this.count = 0
    // loadFactor 装载因子 > 0.75 的时候扩容  <0.25  减小容量
    this.limit = 7

  }
  hashFunc(str, size) {
    // 定义hashCode 变量
    var hashCode = 0
    // 霍纳算法，来计算hashCode 的值
    // cats -> Unicode 编码
    for (let i = 0; i < str.length; i++) {
      hashCode = 37 * hashCode + str.charCodeAt(i)

    }
    // 取余操作
    const index = hashCode % size
    return index
  }
  // 插入或修改方法
  put(key, value) {
    // 根据key获取索引值
    // 目的： 将诗句插入到对应的位置
    // 根据索引值去除bucket
    // 如果桶不存在，创建桶，并且防止在该索引的位置
    // 判断新增还是修改原来的值

    // 1.根据key获取索引值
    let index = this.hashFunc(key, this.limit)

    // 根据index取出对应的bucket
    let bucket = this.storage[index]

    // 3.判断该bucket 是否为null
    if (bucket == null) {
      bucket = []
      this.storage[index] = bucket
    }
    // 4.查找对应的元素 并修改
    for (var i = 0; i < bucket.length; i++) {
      let tuple = bucket[i]
      if (tuple[0] === key) {
        tuple[1] = value
        return
      }
    }

    // 进行添加对象
    bucket.push([key, value])
    this.count++
    this.countAdd()
  }
  // 查找
  get(key) {
    // 根据key 获取对应的index
    // 根据index 获取对应的bucket
    // 判断bucket 是否为null 如果为null 直接返回null
    // 遍历线性查找bucket中的每一个key,是否等于传入的key
    // 如果等于，那么直接返回对应的value
    // 遍历完后 找不到 返回null
    const bucket = this.getBucketByKey(key)
    if (bucket == null) return null

    for (let i = 0; i < bucket.length; i++) {
      const tuple = bucket[i]
      if (tuple[0] === key) {
        return tuple[1]
      }
    }
    return null
  }
  getBucketByKey(key) {
    let index = this.hashFunc(key, this.limit)
    const bucket = this.storage[index]
    return bucket
  }
  remove(key) {
    // 根据key 获取对应的index
    // 根据index 获取对应的bucket
    // 判断bucket 是否为null 如果为null 直接返回null
    // 遍历线性查找bucket中的每一个key,是否等于传入的key
    // 如果等于，那么直接返回对应的value
    // 遍历完后 找不到 返回null

    const bucket = this.getBucketByKey(key)
    if (bucket == null) return null
    for (let i = 0; i < bucket.length; i++) {
      let tuple = bucket[i]
      if (tuple[0] === key) {
        bucket.splice(1, 1)
        this.count--
        this.countDown()
        return tuple[1]
      }
    }
    return null
  }
  countAdd() {
    if (this.count > this.limit * 0.75) {
      const newSize = this.getPrime(this.limit * 2)
      this.resize(newSize)
    }
  }
  countDown() {
    if (this.limit > 7 && this.count < this.limit * 0.25) {
      let newSize = Math.floor(this.limit / 2)
      newSize = this.getPrime(newSize)
      this.resize(newSize)
    }
  }

  // 判断哈希表是否为空
  get isEmpty() {
    return this.count === 0
  }
  get size() {
    return this.count
  }
  // 扩容
  resize(newLimit) {
    var oldStorage = this.storage
    this.storage = []
    this.count = 0
    this.limit = newLimit
    for (let i = 0; i < oldStorage.length; i++) {
      let bucket = oldStorage[i]
      // 判断bucket 是否为null
      if (bucket == null) {
        continue
      }
      for (let j = 0; j < bucket.length; j++) {
        let tuple = bucket[j]
        this.put(tuple[0], tuple[i])
      }
    }
  }
  // 判断是否为质数
  isPrime(num) {
    // for (let i = 2; i < num; i++) {
    //   if (num % i === 0) {
    //     return false
    //   }
    // }
    // return true
    // 通过开平方获取最大值
    // 获取num的平方根
    let temp = parseInt(Math.sqrt(num))
    // 循环判断
    for (let i = 2; i <= temp; i++) {
      if (temp % i === 0) {
        return false
      }
    }
    return true
  }
  // 获取新的质数
  getPrime(newSize) {

    while (!this.isPrime(newSize)) {
      newSize++
    }
    return newSize
  }
}


const ht = new HashTable()
ht.put('abc', '123')
ht.put('a', '12223')
ht.put('b', '12343')
ht.put('c', '1243')

console.log(ht.get('abc'), ht.size)


// 扩容


