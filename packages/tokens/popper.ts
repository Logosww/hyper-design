import type { InjectionKey, Ref } from "vue";
import type { Instance } from '@popperjs/core';

export type Measurable = {
    getBoundingClientRect: () => DOMRect
};

/**
 * triggerRef指向触发popper的元素
 * contentRef指向popper的内容元素
 * referenceRef指向popper内容关联的元素
 */
export type HPopperInjectionContext = {
    triggerRef: Ref<Measurable | undefined>,
    contentRef: Ref<HTMLElement | undefined>,
    popperInstanceRef: Ref<Instance | undefined>,
    referenceRef: Ref<Measurable | undefined>
};

export type HPopperContentInjectonContext = {
    arrowRef: Ref<HTMLElement | undefined>,
    arrowOffset: Ref<number | undefined>
};

export const POPPER_INJECTION_KEY: InjectionKey<HPopperInjectionContext> = Symbol('popper');

export const POPPER_CONTENT_INJECTION_KEY: InjectionKey<HPopperContentInjectonContext> = Symbol('popperContent');