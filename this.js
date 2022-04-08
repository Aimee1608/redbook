const o1 = {
  name: 1,
  fn: function () {
    console.log(this.name)
  }
}

const o2 = {
  name: 2,
  fn: function () {
    o1.fn()
  }
}

const o3 = {
  name: 3,
  fn: function () {
    var fn = o2.fn;
    return fn()
  }
}

o1.fn()
o2.fn()
o3.fn()
