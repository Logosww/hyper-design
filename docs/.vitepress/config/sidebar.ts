// import { ensureLang } from ',,/utils/lang';
// import guideLocale from '../i18n/pages/guide.json';
// import componentLocale from '../i18n/pages/component.json';

export const sidebars = {
    '/guide/': {
        'zh-CN': [
            {
                text: '指南',
                link: '#',
                children: [
                    {
                        text: '呵呵',
                        link: '/zh-CN/guide/design'
                    }
                ]
            }
        ]
    },
    '/component/': {
        'zh-CN': [
            {
                text: 'Basic 基础组件',
                link: '#',
                children: [
                    {
                        text: 'Button 按钮',
                        link: '/zh-CN/component/button'
                    },
                    {
                        text: 'Container 容器',
                        link: '/zh-CN/component/container'
                    },
                    {
                        text: 'Grid 栅格',
                        link: '/zh-CN/component/grid'
                    },
                    {
                        text: 'Icon 图标',
                        link: '/zh-CN/component/icon'
                    },
                    {
                       text: 'Link 链接',
                       link: '/zh-CN/component/link'
                    },
                    {
                        text: 'ScrollView 滚动视图',
                        link: '/zh-CN/component/scrollview'
                    }
                ]
            },
            {
                text: 'Feedback 反馈组件',
                link: '#',
                children: [
                    {
                        text: 'Dialog 对话框',
                        link: '/zh-CN/component/dialog'
                    },
                    {
                        text: 'Message 消息',
                        link: '/zh-CN/component/message'
                    },
                    {
                        text: 'Tooltip 文字提示',
                        link: '/zh-CN/component/tooltip'
                    }
                ]
            }
        ]
    }
}