import { withInstall } from "@hyper/utils";
import Popper from './popper.vue';

import HPopperArrow from './arrow.vue';
import HPopperTrigger from './trigger.vue';
import HPopperContent from './content.vue';

export {
    HPopperArrow,
    HPopperTrigger,
    HPopperContent
};

export const HPopper = withInstall(Popper);
export default HPopper;

export * from './arrow';
export * from './trigger';
export * from './popper';
export * from './content';
// export { useDeprecateAppendToBody } from './deprecation';

export type { Placement, Options } from '@popperjs/core';

export type HPopperArrowInstance = InstanceType<typeof HPopperArrow>;
export type HPopperArrowTrigger = InstanceType<typeof HPopperTrigger>;
export type HPopperArrowContent = InstanceType<typeof HPopperContent>;