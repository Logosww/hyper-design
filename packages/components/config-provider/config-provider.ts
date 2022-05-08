import { defineComponent, renderSlot, watch } from 'vue';
import { provideGlobalConfig } from '@hyper/hooks';
// import type { Language } from 'locale';
import { ButtonConfigContext } from '@hyper/components/button';
import { MessageConfigContext } from '@hyper/components/message';

export const messageConfig: MessageConfigContext = {};

export const configProviderProps = {
    // locale: {
    //     type: Language
    // },
    size: {
        type: String,
        values: ['large', 'default', 'small']
    },
    button: {
        type: ButtonConfigContext
    },
    message: {
        type: MessageConfigContext
    },
    zIndex: Number
};

export default defineComponent({
    name: 'HConfigProvider',
    props: configProviderProps,

    setup(props, { slots }) {
        watch(
            () => props.message,
            (val) => {
                Object.assign(messageConfig, val ?? {});
            },
            { immediate: true, deep: true }
        );
        const config = provideGlobalConfig(props);
        return () => renderSlot(slots, 'default', { config: config?.value });
    }
})