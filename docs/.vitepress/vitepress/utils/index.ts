import {
    endingSlashRE,
    isActive,
    isExternal,
    normalize,
  } from 'vitepress/dist/client/theme-default/utils'
import { inBrowser } from 'vitepress';
import type { Route } from 'vitepress';
import type { Ref } from 'vue';

export {
    isArray,
    isNullish,
    isExternal,
    isActive,
    normalize,
    joinUrl,
    ensureEndingSlash,
    ensureStartingSlash,
    removeExtention,
  } from 'vitepress/dist/client/theme-default/utils';

export const isActiveLink = (
    route: Route,
    pathPattern: string,
    match?: boolean
) => {
    if(!match) return isActive(route, pathPattern);
    const regEx = new RegExp(pathPattern);
    return regEx.test(normalize(`/${route.data.relativePath}`));
}

export const throttleAndDebounce = (cb: () => any, delay: number) => {
  let timeout: ReturnType<typeof setTimeout>;
  let called = false;
  return () => {
    if(timeout) clearTimeout(timeout);
    if(!called) {
      cb();
      called = true;
      setTimeout(() => called = false, delay);
    } else timeout = setTimeout(cb, delay);
  }
}

export const insertTableWrapper = (contentRef: Ref<{ $el: HTMLElement }>) => {
  if(!inBrowser) return;
  const tables: HTMLTableElement[] = Array.from(
    contentRef.value?.$el.querySelectorAll('table') ?? []
  );
  tables.forEach(table => {
    const wrapper = document.createElement('div');
    wrapper.classList.add('vp-table');
    table.parentNode!.insertBefore(wrapper, table);
    table.parentNode!.removeChild(table);
    wrapper.appendChild(table);
  })
}