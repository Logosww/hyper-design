import { onUnmounted } from "vue";
import { isClient } from "@vueuse/core";
import { getScrollBarWidth } from "@hyper/utils";

export const useLockScreen = () => {
    let scrollBarWidth = 0;
    let withoutHiddenClass = false;
    let bodyPaddingRight = '0';
    let computedBodyPaddingRight = 0;

    onUnmounted(() => cleanup());

    const cleanup = () => {
        if(!isClient) return;
        document.body.classList.remove('hp-popup-parent--hidden');
        if(withoutHiddenClass) document.body.style.paddingRight = bodyPaddingRight;
    };

    const lock = () => {
        if(!isClient) return;
        withoutHiddenClass = !document.body.classList.contains('hp-popup-parent--hidden');
        if(withoutHiddenClass) {
            bodyPaddingRight = document.body.style.paddingRight;
            computedBodyPaddingRight = Number.parseInt(
                document.body.style.paddingRight,
                10
            );
        }
        scrollBarWidth = getScrollBarWidth();
        const bodyHasOverflow = 
            document.documentElement.clientHeight < document.body.scrollHeight;
        const bodyOverflowY = document.body.style.overflowY;
        if(
            scrollBarWidth > 0 &&
            (bodyHasOverflow || bodyOverflowY === 'scroll') &&
            withoutHiddenClass
        ) document.body.style.paddingRight = `${
            computedBodyPaddingRight + scrollBarWidth
        }px`;
        
        document.body.classList.add('hp-popup-parent--hidden');
    };

    return {
        lock,
        cleanup
    };
}