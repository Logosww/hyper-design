---
title: ScrollView
lang: zh-CN
---

# ScrollView 滚动视图

原生 webkit 滚动条看起来不是很优雅，试试这个？



## 组件用法

设置`height`属性来控制滚动视图的高度。不指定则自动适应高度。



:::demo 你还可以设置`max-height`，当元素内容的高度超过最大高度时，显示滚动条。



scrollview/basic



:::



## 横向滚动

滚动视图容器内容超过其宽度时，会显示横向滚动条。



:::demo



scrollview/horizontal

:::



## ScrollView 属性

| 名称       | 类型            | 可选值       | 默认值 | 描述                                             |
| ---------- | --------------- | ------------ | ------ | ------------------------------------------------ |
| height     | string / number | —            | —      | 滚动视图的高度                                   |
| max-height | string / number | —            | —      | 滚动视图的最大高度，内容超过这个高度时显示滚动条 |
| always     | boolean         | true / fasle | false  | 是否始终显示滚动条                               |
| not-resize | boolean         | true / false | false  | 是否响应滚动视图尺寸变化                         |
| wrap-style | string          | —            | —      | 滚动视图容器的自定义样式                         |
| wrap-class | string          | —            | —      | 滚动视图容器的自定义类名                         |
| view-style | string          | —            | —      | 滚动视图内容的自定义样式                         |
| view-class | string          | —            | —      | 滚动视图内容的自定义类名                         |
| tag        | string          | —            | div    | 滚动视图的元素标签                               |
| min-size   | number          | —            | 20     | 滚动条的最小尺寸                                 |
| native     | boolean         | true / false | false  | 是否使用原生滚动条                               |



## ScrollView 方法

| 名称          | 参数                 | 描述                   |
| ------------- | -------------------- | ---------------------- |
| scrollTo      | —                    | 滚动到指定坐标位置     |
| setScrollTop  | (scrollTop: number)  | 设置滚动条到顶部的距离 |
| setScrollLeft | (scrollLeft: number) | 设置滚动条到左边的距离 |
| update        | —                    | 手动更新滚动条状态     |

