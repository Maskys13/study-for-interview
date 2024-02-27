### 1. watch 和 created 谁先执行？
```
watch配置immediate为true会先执行，不设置则后执行
```
### 2.在 Vue 里面挂载全局方法？
```
通过挂载到Vue的原型对象中
Vue.prototype.$a = ...

```