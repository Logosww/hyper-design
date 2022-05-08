import { unref } from 'vue';
import { isArray } from '@hyper/utils';

import type { Ref } from 'vue';
import type { Trigger } from './tooltip';

export const isTriggerType = (
    trigger: Trigger | Trigger[],
    type: Trigger
): boolean => {
    if(isArray(trigger)) return trigger.includes(type);
    
    return trigger === type;
};

export const whenTrigger = (
    trigger: Ref<Trigger | Trigger[]>,
    type: Trigger,
    hanlder: (e: Event) => void
) => {
    return (e: Event) => {
        isTriggerType(unref(trigger), type) && hanlder(e);
    };
}
