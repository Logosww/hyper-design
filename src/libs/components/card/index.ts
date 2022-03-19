import { withInstall } from 'utils';

import Card from './card.vue';

export const MyCard = withInstall(Card);
export default MyCard;

export * from './card';