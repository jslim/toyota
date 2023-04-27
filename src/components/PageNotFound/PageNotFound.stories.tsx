import { Story } from '@storybook/react';

import PageNotFound, { PageNotFoundProps } from './PageNotFound';

export default { title: 'components/PageNotFound' };

export const Default: Story<PageNotFoundProps> = (args) => <PageNotFound {...args} />;

Default.args = {
  eyebrow: '404',
  header: 'Page Not Found',
  description:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum a ante ullamcorper, sollicitudin felis at, porta orci. Vestibulum turpis ipsum, ullamcorper nec nisi non, hendrerit placerat eros.',
  ctaProps: {
    title: 'Back to home',
    href: '/'
  }
};

Default.argTypes = {};
