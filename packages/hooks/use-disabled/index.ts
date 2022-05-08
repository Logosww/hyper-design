import { ref, unref, inject, computed } from 'vue';
import { useProp } from '../use-prop';
import type { MaybeRef } from '@vueuse/core';

export const useDisabled = (fallback?: MaybeRef<boolean | undefined>) => {
    const disabled = useProp<boolean>('disabled');
    // const form = inject(myFormkey, undefined);
    return computed(() => disabled.value || unref(fallback) ||
    // form?.disabled || 
    false)
};
