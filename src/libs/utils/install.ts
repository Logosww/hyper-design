import { Plugin } from 'vue';

export const withInstall = (main) => {
    (main as Plugin).install = (app): void => {
        app.component(main.name, main);
    }
    return main;
};

export const withInstallFunction = (fn, name) => {
    fn.install = app => {
        app.config.globalProperties[name] = fn;
    };
    
    return fn;
};