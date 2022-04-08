// 闭包
function makeSalary(base) {
  return function (performance) {
    return base + performance
  }
}

let salaryLevel1 = makeSalary(12000)
let salaryLevel2 = makeSalary(15000)

const a = salaryLevel1(1000)
const b = salaryLevel2(2000)
