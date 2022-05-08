import { withInstallFunction } from '@hyper/utils';
import Message from './use-message';

export const HMessage = withInstallFunction(Message, '$message');

export default HMessage;

export * from './message';