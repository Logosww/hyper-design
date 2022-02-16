import type { Plugin } from 'vue';
import { MyButton } from 'components/button';
import { MyDialog } from 'components/dialog';
import { MyIcon } from 'components/icon';

export default [
    MyButton,
    MyDialog,
    MyIcon
] as Plugin[];