---
title: Message
lang: zh-CN
---

# Message 消息

也许是最常用的反馈组件。

## 组件用法

自顶部降临，4 秒后神隐。

该组件为函数组件，通过传入 `options` 对象调用该组件方法，显示消息。`content`属性可以是文本，也可以是`VNode`，下例展示了两种类型的消息。`options`详细参数见下方表格。



:::demo 你也可以直接传入文本或者`VNode`给该方法，无需`options`对象，它将直接作为 `options` 的`content` 属性。



message/basic



:::



## 不同类型

指定`options`对象的`type`值，来显示不同类型的消息。

我们也为不同的`type`值注册了各自的方法，其参数即为原本 `options`中的`content`属性。你可以像本例中的`showMsg1`方法来调用他们。

:::demo 



message/type



:::



## 消息按钮

有时候你可能需要在消息上添加一个操作按钮与用户交互。



:::demo 你可以通过设置`button`、`btnOnClick`属性来进行简单的交互。这个按钮是`文字按钮`。



message/button



:::



## 全局方法

当你全局完整引入 Hyper UI 时，我们会为你注册一个该函数组件的全局方法`$message`，它在`app.config.globalProperties`中，助你在任何上下文环境中方便地使用这个组件。

:::tip



如果你习惯于 Vue 2 的 Options API 规范，你可以方便地在任何生命周期钩子中通过`this.$message`方法显示消息。但是如果你更喜欢 Vue 3 的 Composition API 规范，你将不允许在`setup`钩子中使用这个方法，因为此时不存在`this`，显然你需要找到当前应用实例的上下文，通过`appContext.config.globalProperties.$message`来调用此方法，因此我们更推荐你单独引入该函数组件来进行调用。



:::

:::demo 



message/global



:::



## 手动关闭

Message 组件提供了方法可以让你手动关闭消息。通过调用当前 Message 实例的`close`方法来关闭它，或者调用`HMessage.close`方法手动传入指定实例的`id`关闭它。实例及其`id`在调用 Message 函数组件时返回。



:::demo 还可以调用`HMessage.closeAll`方法关闭当前所有的 Message。



message/close



:::



## Message API

### Options 配置项

| 名称       | 类型                                      | 默认值           | 说明                               |
| ---------- | ----------------------------------------- | ---------------- | ---------------------------------- |
| type       | string                                    | 'info'           | 消息类型                           |
| content    | string \| VNode \| (() => VNode)          | —                | 消息内容                           |
| duration   | number                                    | 4000             | 消息显示时间，单位 ms              |
| offset     | number                                    | 20               | 消息到页面顶部的距离               |
| onClose    | function                                  | —                | 消息关闭时的回调                   |
| button     | string                                    | —                | 消息按钮的标题，若为空则不显示按钮 |
| btnColor   | HEX / RGB / HSL / HWB (a)，CSS 色值即可。 | 该消息类型的颜色 | 消息按钮的颜色                     |
| btnOnClick | function                                  | —                | 消息按钮被点击的回调               |



### Message 方法

| 名称              | 参数                             | 描述                                                         |
| ----------------- | -------------------------------- | ------------------------------------------------------------ |
| close             | (id: string, onClose?: function) | 关闭指定 Message 实例，参数 id 为指定实例的 id，参数 onClose （可选）为关闭时的回调。 |
| close（当前实例） | —                                | 关闭当前 Message 实例                                        |
| closeAll          | —                                | 关闭所有 Message 实例                                        |

