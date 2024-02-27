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
