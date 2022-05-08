import type { Plugin } from 'vue';
import { HButton } from '@hyper/components/button';
import { HDialog } from '@hyper/components/dialog';
import { HIcon } from '@hyper/components/icon';
import { HCard } from '@hyper/components/card';
import { HAvatar } from '@hyper/components/avatar';
import { HLink } from '@hyper/components/link';
import { HScrollview } from '@hyper/components/scrollview';
import { HRow } from '@hyper/components/row';
import { 
    HContainer,
    HAside,
    HMain,
    HHeader,
    HFooter
} from '@hyper/components/container';
import { HCollapseTransition } from '@hyper/components/collapse-transition';
import { HPopper } from '@hyper/components/popper';
import { HTooltip } from '@hyper/components/tooltip';


export default [
    HButton,
    HDialog,
    HIcon,
    HCard,
    HAvatar,
    HContainer,
    HAside,
    HMain,
    HHeader,
    HFooter,
    HLink,
    HScrollview,
    HRow,
    HCollapseTransition,
    HPopper,
    HTooltip
] as Plugin[];