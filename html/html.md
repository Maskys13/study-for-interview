### 1.回流和重绘
```
重绘：当页面中元素样式的改变并不影响它在文档流中的位置时（例如：color、background-color、visibility等），浏览器会将新样式赋予给元素并重新绘制它，这个过程称为重绘。
回流：当render tree中部分或全部元素的尺寸、结构或某些属性发生改变时，浏览器重新渲染部分或全部文档的过程称为回流。
回流必定引起重绘，但重绘不一定回流。

引起回流：
1. 页面首次渲染
2. 浏览器窗口大小发生改变
3. 元素尺寸或位置发生改变
4. 元素内容变化（字体数量或图片大小等等）
5. 元素字体大小变化
6. 添加或删除可见的DOM元素
7. 激活CSS伪类
8. 查询某些属性或调用某些方法

引起回流的属性和方法：

1. clientWidth、clientHeight、clientTop、clientLeft
2. offsetWidth、offsetHeight、offsetTop、offsetLeft
3. scrollWidth、scrollHeight、scrollTop、scrollLeft
4. scrollIntoView()、scrollIntoViewIFFNeeded()
5. getComputedStyle()
6. getBoundingClientRect()
7. scrollTo()

减少回流和重绘
css

1. 避免使用table布局
2. 尽可能在DOM树的最末端改变class
3. 避免设置多层内联样式
4. 将动画效果添加再position为absolute或fixed的元素上

JS

1. 避免频繁操作样式，最好一次性重写style属性，或者将样式列表定义为class并一次性更改class属性。
2. 避免频繁操作DOM，创建一个documentFragment，再它上面应用所有DOM操作，最后再把它添加到文档中。
3. 将元素先设置display：none，在进行一系列操作，然后在显示出来，这个属性上不会引起回流和重绘
4. 避免频繁读取引起回流的属性，可用一个变量缓存起来
5. 具有复杂动画的元素使用绝对定位，脱离文档流，否则会引起父元素及后续元素频繁的回流
```
### 2.行内元素有哪些？块级元素有哪些？空(void)元素有哪些？
```
行内元素：a, span, i, img, input, select, strong
块级元素：div, p, h1-h5, ul, li, dl, dt, dd
空(void)元素： br, hr, img, link, meta, input
```