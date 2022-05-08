import type { InjectionKey } from 'vue';

export interface ScrollbarContext {
    scrollviewElement: HTMLDivElement;
    wrapperElement: HTMLDivElement
};

export const scrollbarContextKey: InjectionKey<ScrollbarContext> = Symbol('scrollbarContextKey');