import type { Plugin } from 'vue';
import { MyButton } from 'components/button';
import { MyDialog } from 'components/dialog';
import { MyIcon } from 'components/icon';
import { MyCard } from 'components/card';
import { MyAvatar } from 'components/avatar';

export default [
    MyButton,
    MyDialog,
    MyIcon,
    MyCard,
    MyAvatar
] as Plugin[];