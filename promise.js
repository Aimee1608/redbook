let p1 = new Promise((resolve, reject) => resolve());
setTimeout(console.log, 0, p1)

// let p2 = new Promise((resolve, reject) => reject());
// setTimeout(console.log, 0, p2); // Promise <rejected>
let p = new Promise((resolve, reject) => setTimeout(resolve, 1000));
setTimeout(console.log, 0, p);

let p3 = new Promise((resolve, reject) => {
  setTimeout(reject, 10000); //10秒后调用reject() // 执行函数的逻辑
});
setTimeout(console.log, 0, p3);      // Promise <pending>
setTimeout(console.log, 11000, p3); //11秒后再检查状态 // (After 10 seconds) Uncaught error
// (After 11 seconds) Promise <rejected>

function onResolved(id) {
  setTimeout(console.log, 0, id, 'resolved');
}
function onRejected(id) {
  setTimeout(console.log, 0, id, 'rejected');
}
let p4 = new Promise((resolve, reject) => setTimeout(resolve, 3000));
let p5 = new Promise((resolve, reject) => setTimeout(reject, 3000));

// 非函数处理程序会被静默忽略，不推荐 
p4.then('gobbeltygook');
// 不传 onResolved 处理程序的规范写法 
p5.then(null, () => onRejected('p2'));

let p6 = new Promise(() => { });
let p7 = p6.then();
setTimeout(console.log, 0, p6);         // Promise <pending>
setTimeout(console.log, 0, p7);         // Promise <pending>
setTimeout(console.log, 0, p6 === p7);  // false

let p11 = Promise.resolve();
p1.then(() => console.log('p11.then() onResolved'));
console.log('p11.then() returns');
let p12 = Promise.reject();
p12.then(null, () => console.log('p12.then() onRejected'));
console.log('p12.then() returns');
console.log('p13.catch() returns');
let p13 = Promise.reject();
p13.catch(() => console.log('p13.catch() onRejected'));
let p14 = Promise.resolve();
p14.finally(() => console.log('p14.finally() onFinally'));
console.log('p14.finally() returns');
// p11.then() returns
// p12.then() returns
// p13.catch() returns
// p14.finally() returns 
// p11.then() onResolved 
// p12.then() onRejected 
// p13.catch() onRejected 
// p14.finally() onFinally

async function foo() {
  console.log(2);
  console.log(await Promise.resolve(8));
  console.log(9);
}

async function bar() {
  console.log(4);
  console.log(await 6);
  console.log(7);
}
console.log(1);
foo();
console.log(3);
bar();
console.log(5);