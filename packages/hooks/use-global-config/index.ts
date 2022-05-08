import { inject, ref, computed, unref, provide, getCurrentInstance } from 'vue';
import { configProviderContextKey } from '@hyper/tokens';
import { debugWarn } from '@hyper/utils';
import type { MaybeRef } from '@vueuse/core';
import type { Ref, App } from 'vue';
import type { ConfigProviderContext } from '@hyper/tokens';

const globalConfig = ref<ConfigProviderContext>();

export function useGlobalConfig<
    K extends keyof ConfigProviderContext,
    D extends ConfigProviderContext[K]
>(
    key: K,
    defaultValue?: D
): Ref<Exclude<configProviderContextKey[K], undefined> | D>;
export function useGlobalConfig(): Ref<ConfigProviderContext>;
export function useGlobalConfig(
    key?: keyof ConfigProviderContext,
    defaultValue = undefined
) {
    const config = getCurrentInstance()
      ? inject(configProviderContextKey, globalConfig)
      : globalConfig;
    if(key) return computed(() => config.value?.[key] ?? defaultValue)
    else return config;
};

export const provideGlobalConfig = (
    config: MaybeRef<ConfigProviderContext>,
    app?: App,
    global = false
) => {
    const inSetup = !!getCurrentInstance();
    const oldConfig = inSetup ? useGlobalConfig() : undefined;

    const provideFn = app?.provide ?? (inSetup ? provide : undefined);
    if(!provideFn) {
      debugWarn(
        'provideGlobalConfig',
        'method provideGlobalConfig() can only be used inside method setup()'
      );
      return;
    }

    const context = computed(() => {
        const cfg = unref(config);
        if(!oldConfig?.value) return cfg;
        return mergeConfig(oldConfig.value, cfg);
    });
    provideFn(configProviderContextKey, context);
    if(global || !globalConfig.value) globalConfig.value = context.value;
    return context;
};

const mergeConfig = (
    a: ConfigProviderContext,
    b: ConfigProviderContext
): ConfigProviderContext => {
    const keys = [...new Set([...Object.keys(a), ...Object.keys(b)])];
    let obj = {};
    for(const key of keys) obj[key] = b[key] ?? a[key];
    return obj;
}