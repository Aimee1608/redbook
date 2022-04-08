// js 为什么采用单线程模式
// 因为js起初是为了处理dom交互内容
// 如果js是多线程浏览器就没办法确定使用哪一个的线程的内容为准， 比如两个线程同时操作了dom 的删除和修改

const { invoke } = require("lodash")

// 同步模式
// 为什么要有异步
// 同步任务耗时很大的时候，会等待执行完才会执行下面的任务，会导致卡顿

// 异步模式

// 代码输出
// global begin

// global end

// timer2 invoke

// timer1 invoke

// inner invoke


// 浏览器并不是一个单线程的，浏览器会有单独处理异步模式的api的倒计时，比如setTimeout


// 回调函数

