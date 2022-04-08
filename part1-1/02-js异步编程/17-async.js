// async awiat 语法糖
async function main() {
  try {
    const p1 = await Promise.resolve(1)
    console.log(p1)

    const p2 = await Promise.resolve(2 + p1)
    console.log(p2)
    return p2
  } catch (e) {
    console.log('error-e', e)
  }

}

// const promise = main()
// console.log(promise)
// promise.then(() => {
//   console.log('all completed')
// })

Promise.resolve(1).then(res => {
  console.log('then1', res)
  return 2
}).then(res => {
  console.log('then2', res)
}).then(res => {
  console.log('then3', res)
}).then(res => {
  console.log('then4', res)
}).then(undefined)
  .then(Promise.resolve(3))
  .then(res => {
    console.log('then6', res)
  })