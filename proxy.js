const target = {
  foo: 'bar'
};

const firstProxy = new Proxy(target, {
  get() {
    console.log('first proxy');
    return Reflect.get(...arguments);
  }
});

const secondProxy = new Proxy(firstProxy, {
  get() {
    console.log('second proxy');
    return Reflect.get(...arguments);
  }
});
console.log(secondProxy.foo)

const myTarget = {};
const proxy = new Proxy(myTarget, {
  get(target, property, receiver) {
    console.log('get---');
    return Reflect.get(...arguments);
  },
  set(target, property, value, receiver) {
    console.log('set---222', target, property, value, receiver)
    return Reflect.set(...arguments)
  },
  has(target, property) {
    console.log('has---')
    return Reflect.has(...arguments)
  },
  deleteProperty(target, property) {
    console.log('deleteProperty()');
    return Reflect.deleteProperty(...arguments)
  },
  ownKeys(target) {
    console.log('ownKeys()');
    return Reflect.ownKeys(...arguments)
  },
  getPrototypeOf(target) {
    console.log('getPrototypeOf()');
    return Reflect.getPrototypeOf(...arguments)
  },
  setPrototypeOf(target, prototype) {
    console.log('setPrototypeOf()');
    return Reflect.setPrototypeOf(...arguments)
  },
  isExtensible(target) {
    console.log('isExtensible()');
    return Reflect.isExtensible(...arguments)
  }
})
proxy.foo = 'bar'
'foo' in proxy;
console.log('myTarget', myTarget, myTarget.foo)

'foo' in myTarget;
proxy.foo2 = 'bar2'

Object.keys(proxy);


const myTarget2 = function () {

};

const proxy2 = new Proxy(myTarget2, {
  apply(target, thisArg, ...argumentsList) {
    console.log('apply()');
    return Reflect.apply(...arguments)
  },
  construct(target, argumentsList, newTarget) {
    console.log('construct');
    return Reflect.construct(...arguments)
  }
});

proxy2();

new proxy2;


// 代理模式
const user = {
  name: 'Jake'
};
const proxy3 = new Proxy(user, {
  get(target, property, receiver) {
    console.log(`Getting ${property}`);
    return Reflect.get(...arguments);
  },
  set(target, property, value, receiver) {
    console.log(`Setting ${property}=${value}`);
    return Reflect.set(...arguments);
  }
});
proxy3.name;
proxy3.age = 27;

const userList = [];
function emit(newValue) {
  console.log('newValue', newValue);
}
const proxy4 = new Proxy(userList, {
  set(target, property, value, receiver) {
    const result = Reflect.set(...arguments);
    if (result) {
      emit(Reflect.get(target, property, receiver));
    }
    return result;
  }
});
proxy4.push('John');
proxy4.push('Jacob');
console.log('proxy4', proxy4)

