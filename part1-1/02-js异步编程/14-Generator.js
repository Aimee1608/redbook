// Generator
// 生成器函数
function* foo() {
  console.log('start')

  try {
    const res = yield 'foo'
    console.log(res)
  } catch (e) {
    console.log('error---', e)
  }
}
const generator = foo()
// const result = generator.next()
// console.log('resule', result)
// generator.next('bar')

// generator.throw(new Error('generator error'))


const promise = Promise.resolve(1)

function* main() {
  try {
    console.log('promise', promise)
    const p1 = yield promise
    console.log(p1)

    const p2 = yield Promise.resolve(2 + p1)
    console.log(p2)
  } catch (e) {
    console.log('error-e', e)
  }

}

const g = main()
// const result2 = g.next()
// console.log('result2', result2)
// result2.value.then(data => {
//   console.log('data', data)
//   const res = g.next(data)
//   console.log('res', res)
//   res.value.then(data2 => {
//     const res2 = g.next(data2)
//     console.log('res2', res2)
//   })
// })

function handleResult(result) {
  if (result.done) return
  result.value.then(data => {
    handleResult(g.next(data))
  }, error => {
    g.throw(error)
  })
}

handleResult(g.next())



// co封装
function co(generator) {
  const g = generator()
  function handleResult(result) {
    if (result.done) return
    result.value.then(data => {
      handleResult(g.next(data))
    }, error => {
      g.throw(error)
    })
  }
  return handleResult(g.next())
}
co(main)