import HyperUI from 'hyperui';

import VPApp, { globals } from '../vitepress';
import { define } from '../utils/types';
// import 'unocss';

import type { Theme } from 'vitepress';

export default define<Theme>({
    Layout: VPApp,
    enhanceApp: ({ app }) => {
        app.use(HyperUI);

        globals.forEach(([name, comp]) => {
            app.component(name, comp);
        })
    }
});