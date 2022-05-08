---
title: Link
lang: zh-CN
---

# Link 链接

我超！链接。



## 组件用法

传入`href`属性来直达你想要去的地方。

:::demo 设置`type`属性来显示各种不同类型的链接。当然，你也可以自己设置`color`来定制你的链接。



link/basic



:::



## 下划线

如果你不喜欢默认的下划线，你可以通过设置`underlined`属性来控制。

:::demo



link/underline



:::



## 禁用状态

和按钮一样，设置`disabled`属性 ban 掉它。

:::demo 



link/disabled



:::



## 图标

也和按钮一样，设置`icon`属性加上喜爱的图标。

:::demo 



link/icon



:::



## Link 属性

| 名称      | 类型    | 可选值                                    | 默认值  | 描述               |
| --------- | ------- | ----------------------------------------- | ------- | ------------------ |
| type      | string  | default / primary / danger / warn         | default | 链接类型           |
| color     | string  | HEX / RGB / HSL / HWB (a)，CSS 色值即可。 | —       | 链接颜色           |
| underline | boolean | true / false                              | true    | 链接是否显示下划线 |
| disabled  | boolean | true / false                              | false   | 是否禁用链接       |
| icon      | string  | 图标组件`h-icon`的 name 属性值之一。      | —       | 链接图标           |

