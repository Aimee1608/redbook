//主线程直接执行
console.log('1');
//丢到宏事件队列中
setTimeout(function () {
  console.log('2');
  process.nextTick(function () {
    console.log('3');
  })
  new Promise(function (resolve) {
    console.log('4');
    resolve();
  }).then(function () {
    console.log('5')
  })
})
//微事件1
process.nextTick(function () {
  console.log('6');
})
//主线程直接执行
new Promise(function (resolve) {
  console.log('7');
  resolve();
}).then(function () {
  //微事件2
  console.log('8')
})
//丢到宏事件队列中
setTimeout(function () {
  console.log('9');
  process.nextTick(function () {
    console.log('10');
  })
  new Promise(function (resolve) {
    console.log('11');
    resolve();
  }).then(function () {
    console.log('12')
  })
})


// console.log('start');
// setTimeout(function () {
//   console.log('setTimeout1');
//   const promise2 = new Promise((resolve, reject) => {
//     console.log('promise2');
//     resolve();
//   });
//   promise2.then(() => {
//     console.log('then2');
//     const promise3 = new Promise(resolve => {
//       console.log('promise3');
//       resolve();
//     });
//     promise3.then(() => {
//       console.log('then3');
//     });
//   });
// }, 1000);
// setTimeout(function () {
//   console.log('setTimeout2');
//   const promise4 = new Promise((resolve, reject) => {
//     console.log('promise4');
//     resolve();
//   });
//   promise4.then(() => {
//     console.log('then4');
//   });
// }, 1000);
// const promise1 = new Promise(resolve => {
//   console.log('promise1');
//   resolve();
// });
// promise1.then(() => {
//   console.log('then1');
// });
// console.log('end');