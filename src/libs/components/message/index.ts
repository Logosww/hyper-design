import { withInstallFunction } from 'utils';
import Message from './use-message';

export const MyMessage = withInstallFunction(Message, '$message');

export default MyMessage;

export * from './message';