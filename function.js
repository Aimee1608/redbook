console.log((new Function()).name);
function foo() { }
console.log(foo.bind(null).name);


let dog = {
  years: 1,
  get age() {
    return this.years;
  },
  set age(newAge) {
    this.years = newAge;
  }
}
let propertyDescriptor = Object.getOwnPropertyDescriptor(dog, 'age');
console.log(propertyDescriptor.get.name); // get age 
console.log(propertyDescriptor.set.name); // set age


function sayHi(name, message) {
  console.log("Hello " + name + ", " + message);
  console.log("Hello " + arguments[0] + ", " + arguments[1]);
}
sayHi('aimee', 'hi')

let bar = (...arguments) => {
  console.log(arguments);
};
bar(5);

function factorial(num) {
  if (num <= 1) {
    return 1;
  } else {
    return num * arguments.callee(num - 1)
  }
}

globalThis.color = 'red';
let o = {
  color: 'blue'
};
function sayColor() {
  console.log('arguments', arguments[0])
  console.log(this.color);
}
sayColor();    // 'red'
o.sayColor = sayColor;
o.sayColor();  // 'blue'
// sayColor.call(this); // red
// sayColor.call(globalThis); // red
// sayColor.call(o); // blue
sayColor.apply(o, ['aimee'])
function King() {
  this.royaltyName = 'Henry';
  // this 引用 King 的实例
  setTimeout(() => console.log(this.royaltyName), 1000);
}

function Queen() {
  this.royaltyName = 'Elizabeth';
  // this 引用 window 对象

  setTimeout(function () { console.log(this.royaltyName); }, 1000);
}
new King();  // Henry
new Queen(); // undefined

function fib(n) {
  if (n < 2) {
    return n;
  }
  return fib(n - 1) + fib(n - 2);
}
// fib(50);

// 优化后
function fib2(n) {
  return fibImpl2(0, 1, n);
}
function fibImpl2(a, b, n) {
  if (n === 0) {
    return a;
  }
  return fibImpl2(b, a + b, n - 1)
}
fib2(50)
// fibImpl2(0, 1, 50);