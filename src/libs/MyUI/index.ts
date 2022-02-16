import installer from './full-import';
export * from 'components';
export * from 'hooks';
export { makeInstaller } from './make-installer';

export const install = installer.install;
export default installer;