import { createVNode, isVNode, render } from 'vue';
import { useZIndex } from '@hyper/hooks';
import MessageConstructor from './message.vue';
import { messageTypes } from './message';
import { isClient, isFunction, isString } from '@vueuse/core';

import type { VNode, ComponentPublicInstance } from 'vue';
import type { Message, MessageFn, MessageQueue, MessageQueueItem, MessageProps } from './message';

const instances: MessageQueue = [];
let seed = 1;

const message: MessageFn & Partial<Message> = (options = {}) => {
    // if(typeof options === 'object' && instances.length) {
    //     const tempVm: any = instances.find(
    //         //message的content和type都相同时返回，不再创建实例(badge显示)。
    //         (item: MessageQueueItem) => `${item.vm.props?.content ?? ''}` === 
    //         `${(options as any).content ?? ''}` && (item.vm.props?.type ?? '') === ((options as any).type ?? '')
    //     );
    //     if(tempVm) {
    //         tempVm.vm.component!.props.repeatNum += 1;
    //         tempVm.vm.component!.props.type = options?.type;
    //         console.log('return')
    //         return {
    //             close: (): void => {
    //                 (vm.component!.proxy as ComponentPublicInstance<{ visible: boolean}> ).visible = false
    //             }
    //         }
    //     }
    // }
    if(!isClient) return { close: () => undefined };
    if(isString(options) || isVNode(options)) options = { content: options };

    let verticalOffset = 20;
    instances.forEach(({ vm }: MessageQueueItem): void => {
        verticalOffset += (vm.el?.offsetHeight || 0) + 20;
    });
    verticalOffset += 20;

    const { nextZIndex } = useZIndex();

    const id = `message_${seed++}`;
    const userOnClose = options.onClose;
    const props: Partial<MessageProps> = {
        zIndex: nextZIndex(),
        offset: verticalOffset,
        ...options,
        id,
        onClose: () => {
            close(id, userOnClose);
        }
    };

    const container = document.createElement('div');
    container.id = `container_${id}`;
    const content = props.content;

    const vm = createVNode(
        MessageConstructor,
        props,
        isFunction(content)
         ? { default: content }
         : isVNode(content)
         ? { default: () => content }
         : null
    );

    //清除message的dom，防止内存泄漏。
    vm.props!.onDestroy = () => {
        render(null, container);
        //当dom被清除，挂载其上的VNode也会被自动回收。
    };

    render(vm, container);
    //当close方法被调用时，实例集中的实例移出。
    instances.push({ vm });
    document.body.appendChild(container.firstElementChild!);

    return {
        id,
        close: () => {
            (vm.component!.proxy as ComponentPublicInstance< { visible: boolean }>).visible = false;
        }
    }
};

messageTypes.forEach((type: string) => {
    message[type] = (options = {}) => {
        options = { content: options };
        return message({
            ...options,
            type
        });
    };
});

export const close = (id: string, onClose?: () => void): void => {
    const index = instances.findIndex(({ vm }) => id === vm.component!.props.id);
    if(index === -1) return;

    const { vm } = instances[index];
    if(!vm) return;
    vm.props.onClose = onClose;
    (vm.component!.proxy as ComponentPublicInstance< { visible: boolean }>).visible = false; 

    const removeHeight = vm.el!.offsetHeight;
    instances.splice(index, 1);

    const len = instances.length;
    if(len < 1) return;
    for(let i = index; i < len; i++) {
        const pos = parseInt(instances[i].vm.el!.style['top'], 10) - removeHeight - 20;
        instances[i].vm.component!.props.offset = pos;
    };
}

export const closeAll = (): void => {
    for(let i = instances.length - 1; i >= 0; i--) {
        const instance = instances[i].vm.component;
        (instance?.proxy as any)?.close();
    }
};

message.close = close;
message.closeAll = closeAll;

export default message as Message;
