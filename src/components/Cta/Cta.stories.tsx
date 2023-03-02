import { Story } from '@storybook/react';

import Cta, { CtaProps } from './Cta';

export default { title: 'components/Cta' };

export const Default: Story<CtaProps> = (args) => <Cta {...args} />;

Default.args = {
  title: 'All news',
  href: '/'
};

export const White: Story<CtaProps> = (args) => (
  <div style={{ background: '#1E1E1E', padding: '40px' }}>
    <Cta {...args} />
  </div>
);

White.args = {
  title: 'All news',
  isWhite: true
};

export const IconOnly: Story<CtaProps> = (args) => (
  <div style={{ background: '#ca877b', padding: '40px' }}>
    <Cta {...args} />
  </div>
);

IconOnly.args = {
  isWhite: false
};
