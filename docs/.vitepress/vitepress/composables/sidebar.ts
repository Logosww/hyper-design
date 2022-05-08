import { useData, useRoute } from 'vitepress';
import { ensureStartingSlash, removeExtention } from '../utils';
import { computed } from 'vue';
import { useLang } from './';

export const useSidebar = () => {
    const route = useRoute();
    const { site, page } = useData();
    const lang = useLang();
    if(!page.value) return {
        sidebars: computed(() => []),
        hasSidebar: computed(() => false)
    }
    const sidebars = computed(() => {
        if(page.value.frontmatter.sidebar === false) return [];
        const sidebars = getSidebarConfig(
            site.value.themeConfig.sidebars,
            route.data.relativePath,
            lang.value
        );

        return sidebars;
    });

    return {
        sidebars,
        hasSidebar: computed(() => sidebars.value.length > 0)
    }
};

type SidebarItem = {
    text: string,
    link: string
};

type SidebarConfig = SidebarItem[];

type Sidebar = 
    | {
        [key: string]: SidebarConfig
    }
    | false
    | 'auto';

export function isSidebarGroup(item) {
    return item.children !== undefined;
}

export function getSidebarConfig(
    sidebar: Sidebar,
    path: string,
    lang: string
) {
    if(sidebar === false || Array.isArray(sidebar) || sidebar === 'auto') return [];
    path = ensureStartingSlash(path);
    
    for(const dir in sidebar) 
        if(path.startsWith(ensureStartingSlash(`${lang}${dir}`))) return sidebar[dir][lang];

    return [];
};

export function getFlatSidebarLinks(sidebar) {
    return sidebar.reduce((links, item) => {
        if(item.link) links.push({
            text: item.text,
            link: removeExtention(item.link)
        })
        if(isSidebarGroup(item)) links = [...links, ...getFlatSidebarLinks(item.children)];
        
        return links;
    }, []);
};