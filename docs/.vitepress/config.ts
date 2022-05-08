import { head } from './config/head';
import { nav } from './config/nav';
import { sidebars } from './config/sidebar';
import { mdSlot } from './config/slot';
import type { UserConfig } from 'vitepress';

const REPO_PATH = 'https://github.com/Logosww/HyperUI';

export const config: UserConfig = {
    title: 'Hyper UI',
    description: 'a UI component library based on Vue 3',
    lastUpdated: true,
    head,
    locales: {
        '/zh-CN': {
            label: 'zh-CN',
            lang: 'zh-CN'
        }
    },
    themeConfig: {
        repo: REPO_PATH,
        nav,
        sidebars,
        langs: ['zh-CN']
    },

    markdown: {
        config: md => mdSlot(md)
    },

    vue: {
        template: {
            ssr: true
        }
    }
};

export default config;