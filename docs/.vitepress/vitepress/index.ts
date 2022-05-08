import 'normalize.css';
// import 'nprogress/nprogress.css';

import '../../../packages/theme/src/index.scss';

import './style/index.scss';
// import 'uno.css'

import VPApp from './components/vp-app.vue';
import VPDemo from './components/vp-demo.vue';
import Home from './components/globals/home.vue';
import IconList from './components/globals/icon-list.vue';

import type { Component } from 'vue';

export default VPApp;

export const globals: [string, Component][] = [
    ['Demo', VPDemo],
    ['Home', Home],
    ['IconList', IconList]
];