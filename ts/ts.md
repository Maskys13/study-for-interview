### 1.type和interface的区别
```
interface可以重复声明，type不行，继承方式不同，type使用交叉类型方式，interface使用extends实现。
```
### 2.any、unknown、never
```
any和unknown在TS类型中属于最顶层的TOP type,所有类型都是它俩的子类型，never相反，是所有类型的子类型
```
### 3.工具类
```
1.Partial<T> 构造一个新类型，将实际类型参数T中的所有属性变为可选类型。
2.Required<T> 构造一个新类型，将实际类型参数T中的所有属性变为必选属性。
3.Readonly<T> 构造一个新类型，将实际类型参数T中的所欲属性变为只读属性。
4.Record<Keys, Type> 使用给定的对象属性名类型和对象属性类型创建一个新的对象类型。
5.Pick<Type, Keys> 从已有对象类型中选取给定的属性及类型，创建一个新的对象类型。
6.Exclude<UnionType, ExcludedMembers> 从类型T中剔除所有可以赋值给类型U的类型。
7.Omit<Type, Keys> 与Pick<T, K>互补的，从已有对象类型中剔除给定的属性，然后构建一个新的对象类型。
```