import { resolve } from 'path';

export const projRoot = resolve(__dirname, '..', '..', '..');
export const pkgRoot = resolve(projRoot, 'packages');
export const compRoot = resolve(pkgRoot, 'components');
export const themeRoot = resolve(pkgRoot, 'theme');
export const hookRoot = resolve(pkgRoot, 'hooks');
export const hpRoot = resolve(pkgRoot, 'element-plus');
export const utilRoot = resolve(pkgRoot, 'utils')

// Docs
export const docsDirName = 'docs';
export const docRoot = resolve(projRoot, docsDirName);
export const vpRoot = resolve(docRoot, '.vitepress');