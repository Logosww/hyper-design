import {
    Comment,
    Fragment,
    Text,
    cloneVNode,
    defineComponent,
    inject,
    withDirectives
} from 'vue';
import { NOOP, isObject } from '@hyper/utils';
import {
    FORWARD_REF_INJECTION_KEY,
    useForwardRefDirective
} from '@hyper/hooks';
import { debugWarn } from '@hyper/utils';

import type { Ref, VNode } from 'vue';

const SCOPE = 'HOnlyChild';

export const OnlyChild = defineComponent({
    name: SCOPE,
    setup(_, { slots, attrs }) {
        const forwardRefInjection = inject(FORWARD_REF_INJECTION_KEY);
        const forwardRefDirective = useForwardRefDirective(
            forwardRefInjection?.setForwardRef ?? NOOP
        );
        
        return () => {
            const defaultSlot = slots.default?.(attrs);
            if(!defaultSlot) return null;

            if(defaultSlot.length > 1) {
                debugWarn(SCOPE, 'requires exact only one valid child. 需要唯一有效子元素。');
                return null;
            }
            
            const firstLegitNode = findFirstLegitChild(defaultSlot);
            if(!firstLegitNode) {
                debugWarn(SCOPE, 'no valid child node found. 没有找到唯一有效的子元素。');
                return null;
            }

            return withDirectives(cloneVNode(firstLegitNode!, attrs), [
                [forwardRefDirective]
            ]);
        }
    }
});

function findFirstLegitChild(nodes: VNode[] | undefined): VNode | null {
    if(!nodes) return null;
    const children = nodes as VNode[];
    for(const child of children) {
        /**
         * 用户使用渲染函数h(Fragment, [text])只渲染简单的字符串时，
         * 当值是原语时，此处的switch case语句不能处理，
         * 应该直接返回这个包裹的字符串。
         */
        if(isObject(child)) {
            switch(child.type) {
                case Comment:
                    continue;
                case Text:
                    return wrapTextContent(child);
                case 'svg':
                    return wrapTextContent(child);
                case Fragment:
                    return findFirstLegitChild(child.children as VNode[]);
                default:
                    return child;
            }
        }

        return wrapTextContent(child);
    }
    
    return null;
}

function wrapTextContent(s: string | VNode) {
    return <span class="hp-only-child__content">{s}</span>
}

export type OnlyChildExpose = { forwardRef: Ref<HTMLElement> };
