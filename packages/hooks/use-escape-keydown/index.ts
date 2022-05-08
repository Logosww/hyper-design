import { onMounted, onBeforeUnmount } from 'vue';
import { EVENT_CODE } from '@hyper/constants';

export const useEscapeKeydown = (handler?: (e: KeyboardEvent) => void) => {
    const cachedHandler = (e: Event) => {
        const event = e as KeyboardEvent;
        if(event.key === EVENT_CODE.esc) handler?.(event);
    };

    onMounted(() => {
        const element = document || window;
        element?.addEventListener('keydown', cachedHandler);
    });

    onBeforeUnmount(() => {
        const element = document || window;
        element?.removeEventListener('keydown', cachedHandler);
    });
}