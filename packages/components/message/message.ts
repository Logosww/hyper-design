// import createInstance from "./instance";
import { buildProps, definePropType } from "@hyper/utils";
import type { VNode, ExtractPropTypes } from "vue";

const TYPE_MAP = ['success', 'warn', 'info', 'error'];

export const messageProps = buildProps({
    id: {
        type: String,
        default: ''
    },
    duration: {
        type: Number,
        default: 4000
    },
    zIndex: {
        type: Number,
        default: 0
    },
    offset: {
        type: Number,
        default: 20
    },
    type: {
        type: String,
        values: TYPE_MAP,
        default: 'info'
    },
    content: {
        type: definePropType<string | VNode | (() => VNode)>([String, Object, Function])
    },
    button: String,
    btnColor: String,
    onClose: <() => void>(Function),
    btnOnClick: <() => void>(Function)
} as const);

export const messageEmits = {
    destroy: () => true
};

export type MessageProps = ExtractPropTypes<typeof messageProps>;

export type MessageEmits = typeof messageEmits;

export type MessageOptions = Omit<MessageProps, 'id'>;

export type MessageOptionsTyped = Omit<MessageOptions, 'type'>;

export interface MessageHandler {
    id: number
    close: () => void
};

export type MessageParams = Partial<MessageOptions> | string;
export type MessageParamsTyped = Partial<MessageOptionsTyped> | string;

export type MessageFn = ((options?: MessageParams) => MessageHandler) & {
    close(id: string, onClose: () => void): void
    closeAll(): void
};
export type MessageTypedFn = (options?: MessageParamsTyped) => MessageHandler;

export interface Message extends MessageFn {
    error: MessageTypedFn,
    info: MessageTypedFn,
    success: MessageTypedFn,
    warn: MessageTypedFn
};

export type MessageQueueItem = {
    vm: VNode
};

export type MessageQueue = MessageQueueItem[];

export const messageTypes = ['error', 'info', 'success', 'warn'] as const;

export interface MessageConfigContext {
    max?: number
};

/**
 * 先前版本Composition API的实现思路（不够严谨，现已使用TypeScript重新构建）：
 */
// const renderMessage = function(pms = '', typeParams = {}){
//     const isContent = typeof pms == 'string';
//     pms = isContent ? { content: pms, type: 'info' } : pms;
//     const params = Object.assign({
//         duration: 4000,
//         close(){}
//     }, typeParams, pms);
//     let { type, content, duration, close } = params;
//     try {
//         if(!type){
//             throw new Error('Message方法错误：请传入type参数');
//         }
//         if(!content){
//             throw new Error('Message方法错误：请传入content参数');
//         }
//     } catch (error) {
//         console.log(error.message);
//         return;
//     }


//     return createInstance({
//         type,
//         content,
//         duration,
//         close
//     });
// }

// export default renderMessage;