import type { App, Plugin } from 'vue';

const INSTALLED_KEY = Symbol('INSTALLED_KEY');

export const makeInstaller = (components: Plugin[] = []) => {
    const install = (app: App, options = {}) => {
        if(app[INSTALLED_KEY]) return;

        app[INSTALLED_KEY] = true;
        components.forEach((comp) => app.use(comp));
        for(const key in options) app.provide(key, options[key]);
    }
    
    return {
        install
    };
}