import installer from './full-import';
export * from '@hyper/components';
export * from '@hyper/hooks';
export { makeInstaller } from './make-installer';

export const install = installer.install;
export default installer;