---
title: Button
lang: zh-CN
---

# Button 按钮

页面最常见的元素之一。你可以用它来和用户进行交互。

## 组件用法

demo 按钮的基础用法，通过`type`、`plain`、`round`和`circle`属性来选择使用各种按钮。

:::demo 你还可以通过`color`属性传入自定义的色值，它将自动计算相应的样式。(测试)

button/basic

:::

## 禁用状态

:::demo 设置`disabled`属性 ban 掉它！

button/disabled

:::

## 按钮尺寸

:::demo 尺寸属性`size`可以是`small`、`medium`和`large`中的一个。

button/size

:::

## 图标按钮

你可以通过设置`icon`属性添加图标，其值是 Hyper UI 内置图标的名称，即图标组件`h-icon`的`name`属性值。

:::demo 当然你也可以通过图标组件`h-icon`或者自定义类名的`<i>`标签在按钮的任意位置添上需要的图标！

button/icon

:::

## 文字按钮

:::demo 通过设置`type`为`text`来解锁，没有边框和背景色，十分朴素。看上去好像和链接没什么两样...

button/text

:::

## 按钮组

:::demo 请再等等。

button/group

:::



## Button 属性

| 名称     | 类型    | 可选值                                             | 默认值  | 描述           |
| -------- | ------- | -------------------------------------------------- | ------- | -------------- |
| type     | string  | default / primary / danger / success / warn / text | default | 按钮类型       |
| size     | string  | small / medium / large                             | medium  | 按钮尺寸       |
| icon     | string  | 图标组件`h-icon`的 name 属性值之一                 | —       | 按钮图标       |
| plain    | boolean | true / false                                       | false   | 朴素按钮风格   |
| round    | boolean | true / false                                       | false   | 圆角按钮       |
| circle   | boolean | true / false                                       | false   | 圆形按钮       |
| disabled | boolean | true / false                                       | false   | 禁用按钮       |
| color    | string  | HEX / RGB / HSL / HWB (a)，CSS 色值即可。          | —       | 自定义按钮颜色 |

