// pointed 函子
// 实现of 静态方法的函子
// 把 值放在上下文Context 中

class Container {
  static of(value) {
    return new Container(value)
  }
}