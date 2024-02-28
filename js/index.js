const a = {a: 1}
// a = {b: 1}

// 闭包
function func1() {
  var a = 1
  return function func2() {
    a++
  }
}

const b = func1()

class People {}
class Student extends People {}

const vortesnail = new Student();

console.log(vortesnail instanceof People); // true
console.log(vortesnail instanceof Student); // true


// new功能函数
function newFunc(...args) {
  const constructor = args.shift()
  const newInstance = Object.create(constructor.prototype)
  const res = constructor.apply(newInstance, args)
  return (typeof res === 'object' || typeof res === 'function') && res !== null ? res : newInstance
}

function cons() {
  this.name = 'lihua'
  return BigInt(1321321323132123)
}

const res = new cons()
console.log(res);

// 继承
// 1.原型链继承
function Parent1() {
  this.age = '20'
}

Parent1.prototype.sayHello = function() {
  console.log('原型链继承');
}

function Child1() {
  this.name = 'child'
}
Child1.prototype = new Parent1()

var child1 = new Child1()
child1.sayHello()
console.log(child1.age);

// 2.构造函数继承
function Parent2(name) {
  this.name = name
}

function Child2(name) {
  Parent2.call(this, name)
}

var child2 = new Child2('构造函数继承')
console.log(child2.name);

// 3.组合继承(原型继承和构造函数继承组合)
function Parent3(name) {
  this.name = name
}
Parent3.prototype.sayHello = function() {
  console.log('组合继承');
}
function Child3(name) {
  Parent3.call(this, name)
}
Child3.prototype = new Parent3()

var child3 = new Child3('组合')
child3.sayHello()
console.log(child3);

// 4.原型式继承
const parent4 = {
  age: 20,
  name: '原型继承',
  sayHello() {
    console.log(this.name);
  }
}

const child4 = Object.create(parent4)
child4.sayHello()

// 寄生式继承
function objectCopy(obj) {
  function Fn() {}
  Fn.prototype = obj
  return new Fn()
}

function createAnother(obj) {
  let clone = objectCopy(obj)
  clone.showName = function() {
    console.log(this.name);
  }
  return clone
}

let person = {
  age: 10,
  name: '寄生继承',
  hobby: ['唱', '跳']
}

let child5 = createAnother(person)
console.log(child5.name);

// 寄生组合继承
function inheritPrototype(child, parent) {
  let prototype = objectCopy(parent.prototype)
  prototype.constructor = child
  child.prototype = prototype
}

function Parent6(name) {
  this.name = name
  this.hobby = ['唱', '跳']
}
Parent6.prototype.showName = function() {
  console.log(this.name);
}

function Child6(name, age) {
  Parent6.call(this, name)
  this.age = age
}

inheritPrototype(Child6, Parent6)
Child6.prototype.showAge = function() {
  console.log(this.age);
}

let child6 = new Child6('寄生组合继承', 30)

child6.showName()
child6.showAge()

