---
title: Dialog
lang: zh-CN
---

# Dialog 对话框

执行操作之前，唤起一个窗口询问用户进行交互。



## 组件用法

使用`v-model`指令设置组件的`model-value`属性，来控制 Dialog 窗口的显示。

Dialog 窗口的默认插槽和一个具名插槽`footer`，分别为窗口主体和底部。本例使用了具名插槽的别名写法。窗口标题可通过`title`属性指定。



:::demo 还有一个`width`属性可以指定窗口宽度，`draggable`属性指定 Dialog 是否可拖拽，默认开启。



dialog/basic



:::



## 嵌套 Dialog

显然，Dialog 窗口可以嵌套。



:::demo 



dialog/nested



:::



## 自定义内容

更显然，得益于插槽`slot`，你可以插入任意的内容。比如表单、表格、图片等······



## Dialog 属性

| 名称                    | 类型            | 可选值            | 默认值 | 描述                                           |
| ----------------------- | --------------- | ----------------- | ------ | ---------------------------------------------- |
| width                   | string / number | CSS 尺寸值 / 数字 | —      | 对话框宽度                                     |
| top                     | string / number | CSS 尺寸值 / 数字 | —      | 对话框到页面顶部距离                           |
| title                   | string          | —                 | '提示' | 对话框标题                                     |
| z-index                 | number          | —                 | —      | 对话框 z 轴上的层级                            |
| v-model / model-value   | boolean         | true / false      | —      | 是否显示对话框                                 |
| append-to-body          | boolean         | true / false      | true   | 是否插入到 body 元素上                         |
| draggable               | boolean         | true / false      | true   | 是否可拖拽对话框                               |
| lock-scroll             | boolean         | true / false      | true   | 对话框显示时是否锁定页面滚动                   |
| destroy-on-close        | boolean         | true / false      | false  | 关闭对话框时是否销毁组件                       |
| close-on-esacpe-pressed | boolean         | true / false      | true   | Esc 键按下时是否关闭对话框                     |
| close-on-click-modal    | boolean         | true / false      | true   | 点击遮罩是否关闭对话框                         |
| before-close            | function        | —                 | —      | 对话框关闭前的回调，非异步，会暂停对话框的关闭 |



## Dialog 事件

| 名称   | 参数 | 描述                       |
| ------ | ---- | -------------------------- |
| open   | —    | 对话框开启的回调           |
| close  | —    | 对话框关闭的回调           |
| opened | —    | 对话框开启动画结束时的回调 |
| closed | —    | 对话框关闭动画结束时的回调 |

