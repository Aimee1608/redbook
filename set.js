// 集合 对象版
var MySet = /** @class */ (function () {
    function MySet() {
        this.items = {};
    }
    // 向集合添加一个新的项
    MySet.prototype.add = function (value) {
        if (this.items.hasOwnProperty(value)) {
            return false;
        }
        this.items[value] = value;
        return true;
    };
    // 从集合中移除一个值
    MySet.prototype.remove = function (value) {
        if (!this.items.hasOwnProperty(value)) {
            return false;
        }
        delete this.items[value];
        return true;
    };
    // 如果值在集合中返回true 否则返回false
    MySet.prototype.has = function (value) {
        return this.items.hasOwnProperty(value);
    };
    // 移除集合中的所有项
    MySet.prototype.clear = function () {
        this.items = {};
    };
    Object.defineProperty(MySet.prototype, "size", {
        get: function () {
            return Object.keys(this.items).length;
        },
        enumerable: false,
        configurable: true
    });
    MySet.prototype.values = function () {
        return Object.values(this.items);
    };
    return MySet;
}());
var newSet2 = new MySet();
newSet2.add('1');
newSet2.add('2');
newSet2.add('1');
console.log('values  ', newSet2.values());
newSet2.has('1');
console.log('has  ', newSet2.has('1'));
console.log('size  ', newSet2.size);
newSet2.add('3');
newSet2.add('4');
console.log('remove  ', newSet2.remove('4'));
console.log('values  ', newSet2.values());
// 并集
function getAll(setA, setB) {
    var newAllSet = new MySet();
    setA.values().forEach(function (item) {
        newAllSet.add(item);
    });
    setB.values().forEach(function (item) {
        newAllSet.add(item);
    });
    return newAllSet;
}
// 交集
function getCommon(setA, setB) {
    var newCommonSet = new MySet();
    setA.values().forEach(function (item) {
        if (setB.has(item)) {
            newCommonSet.add(item);
        }
    });
    return newCommonSet;
}
// 差集
function getLeft(setA, setB) {
    var newLeftSet = new MySet();
    setA.values().forEach(function (item) {
        if (!setB.has(item)) {
            newLeftSet.add(item);
        }
    });
    return newLeftSet;
}
// 子集
function isChild(setA, setB) {
    var result = setA.values().every(function (item) {
        return setB.has(item);
    });
    return result;
}
var setA = new MySet();
setA.add('a');
setA.add('b');
setA.add('c');
setA.add('d');
setA.add('e');
var setB = new MySet();
setB.add('a');
setB.add('b');
setB.add('c');
setB.add('d');
console.log('并集  ', getAll(setA, setB));
console.log('交集  ', getCommon(setA, setB));
console.log('差集  ', getLeft(setA, setB));
console.log('子集  ', isChild(setA, setB));
