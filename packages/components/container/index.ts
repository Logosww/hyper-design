import { withInstall, withNoopInstall } from '@hyper/utils';

import Container from './container.vue';
import Aside from './aside.vue';
import Main from './main.vue';
import Header from './header.vue';
import Footer from './footer.vue';

export const HContainer = withInstall(Container, {
    Aside,
    Footer,
    Header,
    Main
});

export default HContainer;
export const HAside = withNoopInstall(Aside);
export const HMain = withNoopInstall(Main);
export const HHeader = withNoopInstall(Header);
export const HFooter = withNoopInstall(Footer);