---
title: Container
lang: zh-CN
---

# Container 容器

实现页面布局`Layout`的一种方式，响应式，比较简单直观，也比较不够灵活。通常用来搭建基本的页面结构。

## 组件用法

此套组件一共有5个组件。通过组合、嵌套使用这些组件实现目标布局。

`h-container`：最外层容器，用来包裹其他组件。当其中包裹的组件有`h-header`或者`h-footer`时，子元素会垂直排列，否则水平排列。

`h-header`：用于表示布局中的顶部栏的容器。

`h-aside`：用于表示布局中的侧边栏（左）的容器。

`h-main`：用于表示布局中主要内容的容器。

`h-footer`：用于表示布局中底部栏的容器。



:::demo



container/basic-hm



:::



:::demo



container/basic-am



:::



:::demo



container/basic-hmf



:::



:::demo



container/basic-ham



:::



:::demo



container/basic-hamf



:::



:::demo



container/basic-hmfa



:::



## Container 属性

| 名称      | 类型   | 可选值                | 默认值                                                       | 描述                 |
| --------- | ------ | --------------------- | ------------------------------------------------------------ | -------------------- |
| direction | string | vertical / horizontal | 视子组件而定，其中有`h-header`或`h-footer`时为 vertical，否则为 horizontal | 容器内元素的排列方向 |



## Header 属性

| 名称   | 类型   | 可选值     | 默认值 | 描述       |
| ------ | ------ | ---------- | ------ | ---------- |
| height | string | CSS 尺寸值 | 60px   | 顶部栏高度 |



## Aside 属性

| 名称  | 类型   | 可选值     | 默认值 | 描述       |
| ----- | ------ | ---------- | ------ | ---------- |
| width | string | CSS 尺寸值 | 300px  | 侧边栏宽度 |



## Footer 属性

| 名称   | 类型   | 可选值     | 默认值 | 描述       |
| ------ | ------ | ---------- | ------ | ---------- |
| height | string | CSS 尺寸值 | 60px   | 底部栏高度 |

