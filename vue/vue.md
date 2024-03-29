### 1. watch 和 created 谁先执行？
```
watch配置immediate为true会先执行，不设置则后执行
```
### 2.在 Vue 里面挂载全局方法？
```
vue2:
通过挂载到Vue的原型对象中
Vue.prototype.$a = ...

vue3:
const app = createApp({})
app.config.globalProperties.$a = ...
```
### 3.Vue中的虚拟DOM
```
   采用虚拟DOM的更新技术在性能这块，理论上是不可能比原生Js操作DOM高的。不过在大部分情况下，开发者很难写出绝对优化的命令式代码。所以虚拟DOM就是用来解决这一问题，让开发者的代码在性能上得到保障，甚至无限接近命令式代码的性能。通常情况下，纯Js层面的操作远比DOM操作快。虚拟DOM就是用Js来模拟出DOM结构，通过diff算法来计算出最小的变更，通过对应的渲染器，来渲染到页面上。
   同时虚拟DOM也为跨平台开发提供了极大的便利，开发者写的同一套代码（有些需要针对不同平台做区分），通过不同的渲染规则，就可以生成不同平台的代码。
   在vue中会通过渲染器来将虚拟DOM转换为对应平台的真实DOM。如renderer(vnode， container)，该方法会根据vnode描述的信息（如tag、props、children）来创建DOM元素，根据规则为对应的元素添加属性和事件，处理vnode下的children。
```
### 4.Vue3中的变化(改进)
```
响应式方面：
    Vue3的响应式是基于Proxy来实现的，利用代理来拦截对象的基本操作，配合Reflect.*方法来完成响应式的操作。

书写方面：
    提供了setup的方式，配合组合式API，可以建立组合逻辑，创建响应式数据，创建通用函数，注册生命周期钩子等。

diff算法方面：
    在vue2中使用的是双端diff算法：是一种同时比较新旧两组节点的两个端点的算法（比头、比尾、头尾比、尾头比）。一般情况下，先找出变更后的头部，再对剩下的进行双端diff。
    在vue3中使用的是快速diff算法：它借鉴了文本diff算法的预处理思路，先处理新旧两组节点中相同的前置节点和后置节点。当前置节点和后置节点全部处理完毕后，如果无法通过简单的挂载新节点或者卸载已经不存在的节点来更新，则需要根据节点间的索引关系，构造出一个最长递增子序列。最长递增子序列所指向的节点即为不需要移动的节点。

编译上的优化：
    vue3新增了PatchFlags来标记节点类型（动态节点收集与补丁标志），会在一个Block维度下的vnode下收集到对应的dynamicChildren（动态节点），在执行更新时，忽略vnode的children，去直接找到动态节点数组进行更新，这是一种高效率的靶向更新。
    vue3提供了静态提升方式来优化重复渲染静态节点的问题，结合静态提升，还对静态节点进行预字符串化，减少了虚拟节点的性能开销，降低了内存占用。
    vue3会将内联事件进行缓存，每次渲染函数重新执行时会优先取缓存里的事件。
```
### 5.vue3双向数据绑定
```
value => modelValue
input => update:modelValue
```
### 6.vue3中的ref、toRef、toRefs
```
ref:接收一个内部值，生成对应的响应式数据，该内部值挂载在ref对象的value属性上；该对象可以用于模版和reactive。使用ref是为了解决值类型在setup、computed、合成函数等情况下的响应式丢失问题。

toRef:为响应式对象（reactive）的一个属性创建对应的ref，且该方式创建的ref与源属性保持同步,可以为可选props创建对应的ref。

toRefs：将响应式对象转换成普通对象，对象的每个属性都是对应的ref，两者间保持同步。使用toRefs进行对象解构。不能为可选的属性创建ref
```
### 7.vue3中为什么推荐使用ref而不是reactive
```
reactive有一些局限性
1. 有限的值类型：它只能用于对象类型 (对象、数组和如 Map、Set 这样的集合类型)。它不能持有如 string、number 或 boolean 这样的原始类型。
2. 不能替换整个对象：由于 Vue 的响应式跟踪是通过属性访问实现的，因此我们必须始终保持对响应式对象的相同引用。这意味着我们不能轻易地“替换”响应式对象，因为这样的话与第一个引用的响应性连接将丢失。
3. 对解构操作不友好：当我们将响应式对象的原始类型属性解构为本地变量时，或者将该属性传递给函数时，我们将丢失响应性连接。
```
### 8.computed和watch的区别
```
使用场景：computed适用于一个数据受多个数据影响使用；watch适合一个数据影响多个数据使用。
computed：
    1.能缓存结果。
    2.不能处理异步。
    3.默认是深度监听。
watch:
    1.没有缓存。
    2.能处理异步。
    3.默认不是深度监听。
```
### 9.vue-router的路由守卫
```
路由守卫：全局前置守卫、全局解析守卫、全局后置守卫、路由独享的守卫、组件内的守卫

全局前置守卫：router.beforeEach，一个导航触发时，按照创建顺序调用。导航在所有守卫resolve之前处于等待中。

全局解析守卫：router.beforeResolve，和 router.beforeEach 类似，因为它在每次导航时都会触发，不同的是，解析守卫刚好会在导航被确认之前、所有组件内守卫和异步路由组件被解析之后调用。router.beforeResolve 是获取数据或执行任何其他操作（如果用户无法进入页面时你希望避免执行的操作）的理想位置。

全局后置守卫：router.afterEach，没有next参数，它们对于分析、更改页面标题、声明页面等辅助功能以及许多其他事情都很有用。

路由独享的守卫：在路由配置上定义beforeEnter属性，只会在进入路由时触发，不会在 params、query 或 hash 改变时触发。例如，从 /users/2 进入到 /users/3 或者从 /users/2#info 进入到 /users/2#projects。它们只有在 从一个不同的 路由导航时，才会被触发。

组件内的守卫：为路由组件添加以下配置，beforeRouteEnter、beforeRouteUpdate、beforeRouteLeave
    beforeRouteEnter：1.在渲染该组件的对应路由被验证前调用
                      2.不能获取组件实例 `this` ！
                      3.因为当守卫执行时，组件实例还没被创建！
    beforeRouteUpdate：
                      在当前路由改变，但是该组件被复用时调用。举例来说，对于一个带有动态参数的路径 `/users/:id`，在 `/users/1` 和 `/users/2` 之间跳转的时候，由于会渲染同样的 `UserDetails` 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。因为在这种情况发生的时候，组件已经挂载好了，导航守卫可以访问组件实例 `this`
    beforeRouteLeave：1.在导航离开渲染该组件的对应路由时调用
                      2.与 `beforeRouteUpdate` 一样，它可以访问组件实例 `this`
```
### 10.composition Api 对比 option Api的优势
```
更好的代码组织
更好的逻辑复用
更好的类型推导
```
### 11.Vue组件通信方式有哪些
```
1.props 父传子
2.$emit 子传父
3.ref 子传父
4.EventBus 兄弟组件通信
5.$parent或$root 父传子
6.attrs与listeners 爷孙组件
7.Provide与Inject 爷孙组件
8.Vuex 全局共享
```
### 12.Vue常用的修饰符有哪些
```
1. `.lazy` 在默认情况下，`v-model` 在每次 `input` 事件触发后将输入框的值与数据进行同步 ，可以添加 `lazy` 修饰符，从而转为在 `change` 事件之后进行同步.
2. `.number` 如果想自动将用户的输入值转为数值类型，可以给 `v-model` 添加 `number` 修饰符.
3. `.trim` 如果要自动过滤用户输入的首尾空白字符，可以给 `v-model` 添加 `trim` 修饰符.
4. `.stop` 阻止事件继续传播
5. `.prevent` 阻止标签的默认行为
6. `.capture` 事件先在有这个修饰符的节点触发，然后在其包裹的内部节点中触发
7. `.self` event.target 是当前元素自身时触发处理函数，即事件不是从内部元素触发的
8. `.once` 当前事件只能触发一次
9. `.passive` 滚动事件默认行为会立即触发，而不会等待onScroll完成
```
### 13.keep-alive,有什么作用
```
缓存组件的作用，通过包裹动态组件。
涉及两个生命周期 activated(激活组件)和deactivated(组件失活)
include属性表示匹配到才会缓存，exclude表示匹配到的不缓存
max 表示最多缓存多少组件
```
### 14.为什么data属性是一个函数而不是一个对象
```
组件化存在复用的情况，直接返回一个对象，为引用类型，则会造成数据污染情况。而且函数内为私有作用域，因此互不影响。
```
### 15.vue2的初始化流程
```
合并配置 -> 初始化生命周期 -> 初始化事件 -> 初始化渲染 -> 调用beforeCreate钩子->init injections and reactivity（这个阶段属性都已注入绑定，而且被 `$watch` 变成reactivity，但是 `$el` 还是没有生成，也就是DOM没有生成）-> 初始化state状态（data、props、computed、watcher） -> 调用created钩子

```
