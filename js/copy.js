const target = {}
const source = { a: 1 }
const copy = Object.assign(target, source)
console.log(copy)
source.a = 2
console.log(copy)
console.log(target)

function deepClone(source) {
  let target = Array.isArray(source) ? [] : {}
  for (key in source) {
    if (typeof source[key] === 'object' ) {
      target[key] = deepClone(source[key])
    } else {
      target[key] = source[key]
    }
  }
  return target
}

const obj1 = { a: 1, b: { a: 2, b: [1, 2, 3] } }
const obj2 = deepClone(obj1)
console.log(obj2)
obj1.b.b[0] = 0
console.log(obj1);
console.log(obj2);

const hash = new WeakMap()
console.log(hash.has('a'));
