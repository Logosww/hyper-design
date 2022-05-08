import CollapseTransition from './collapse-transition.vue';

import type { App } from 'vue';
import type { SFCWithInstall } from '@hyper/utils';

CollapseTransition.install = (app: App): void => {
    app.component(CollapseTransition.name, CollapseTransition);
};

const _CollapseTransition = CollapseTransition as SFCWithInstall<
    typeof CollapseTransition
>;

export default _CollapseTransition;
export const HCollapseTransition = _CollapseTransition;