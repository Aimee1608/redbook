// Proxy
const person = {
  name: 'aimee',
  age: 18
}

const personProxy = new Proxy(person, {
  get(target, property) {
    console.log('get', target[property])
    return property in target ? target[property] : 'default'
  },

  set(target, property, value) {
    console.log('value', value)
    if (property === 'age') {
      if (!Number.isInterger(value)) {
        throw new Error('age is number')
      }
    }
    target[property] = value
  },
  deleteProperty(target, property) {
    delete target[property]
  }
})

person.name = 'jiang'

personProxy.name = 'aimee2'

console.log(person.name)


const personProxy2 = new Proxy(person, {
  get(target, property) {
    console.log('get', property)
    return Reflect.get(target, property)
  },

  set(target, property, value) {
    console.log('value---2', value)
    if (property === 'age') {
      if (!Number.isInterger(value)) {
        throw new Error('age is number')
      }
    }
    target[property] = value
  },
  deleteProperty(target, property) {
    delete target[property]
  }
})

personProxy2.name = 'aimee2'

console.log(person.name)