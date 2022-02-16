import { watch, onScopeDispose } from 'vue';

// import { isClient } from '@vueuse/core'
import {
//   throwError,
//   addClass,
//   removeClass,
//   hasClass,
//   getStyle,
  getScrollBarWidth
} from 'utils';

import type { Ref } from 'vue';

/**
 * 用于监视响应式数据变化并作出锁定屏幕和解锁操作的钩子API，
 * 传入响应式数据的引用，将其作为触发器，其值为真时锁定屏幕（假设模态框已打开，反之亦然）。
 * Hook that monitoring the ref value to lock or unlock the screen.
 * When the trigger became true, it assumes modal is now opened and vice versa.
 * @param trigger {Ref<boolean>}
 */
export const useLockScreen = (trigger: Ref<boolean>) => {
  if (document.body.classList.contains(('my-popup-parent--hidden'))) return;

  let scrollBarWidth = 0;
  let withoutHiddenClass = false;
  let bodyPaddingRight = '0';
  let computedBodyPaddingRight = 0;

  const cleanup = () => {
    document.body.classList.remove(('my-popup-parent--hidden'));
    if (withoutHiddenClass) {
      document.body.style.paddingRight = bodyPaddingRight;
    }
  }
  watch(trigger, (val) => {
    if (!val) {
      cleanup()
      return
    }

    withoutHiddenClass = document.body.classList.contains('my-popup-parent--hidden');
    if (withoutHiddenClass) {
      bodyPaddingRight = document.body.style.paddingRight;
      computedBodyPaddingRight = parseInt(
        document.body.style.paddingRight,
        10
      );
    }
    scrollBarWidth = getScrollBarWidth();
    const bodyHasOverflow =
      document.documentElement.clientHeight < document.body.scrollHeight;
    const bodyOverflowY = document.body.style.overflowY;
    if (
      scrollBarWidth > 0 &&
      (bodyHasOverflow || bodyOverflowY === 'scroll') &&
      withoutHiddenClass
    ) {
      document.body.style.paddingRight = `${
        computedBodyPaddingRight + scrollBarWidth
      }px`
    }
    document.body.classList.add('my-popup-parent--hidden');
  })
  onScopeDispose(() => cleanup());
}
