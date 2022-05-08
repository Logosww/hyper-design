import { computed, inject, unref } from 'vue';
import { isClient } from '@vueuse/core';
import { debugWarn, generateId } from '@hyper/utils';

import type { InjectionKey, Ref } from 'vue';
import type { MaybeRef } from '@vueuse/core';

export type HIdInjectionContext = {
    prefix: number,
    current: number
};

const defaultIdInjection = {
    prefix: generateId(),
    current: 0
};

export const ID_INJECTION_KEY: InjectionKey<HIdInjectionContext> = Symbol('elIdInjection');

export const useId = (deterministicId?: MaybeRef<string>): Ref<string> => {
    const idInjection = inject(ID_INJECTION_KEY, defaultIdInjection);

    if(!isClient && idInjection === defaultIdInjection)
        debugWarn(
            'IdInjection',
            `你似乎正在使用服务端渲染（SRR），请提供一个provider以确保注入成功。
            例如: app.provide(ID_INJECTION_KEY, {
              prefix: number,
              current: number,
            })`
        );
    
    const idRef = computed(
        () =>
            unref(deterministicId) ||
            `hp-id-${idInjection.prefix}-${idInjection.current++}`
    );

    return idRef;
};