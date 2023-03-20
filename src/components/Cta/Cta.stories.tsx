// eslint-disable-next-line simple-import-sort/imports
import { Story } from '@storybook/react';

import Cta, { ButtonType, CtaProps } from './Cta';
import ArrowDownSvg from '@/components/svgs/svg-arrow-down.svg';

export default { title: 'components/Cta' };

export const Default: Story<CtaProps> = (args) => <Cta {...args} />;

Default.argTypes = {
  theme: {
    options: ['primary', 'secondary'],
    control: { type: 'select' }
  }
};

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

export const Secondary: Story<CtaProps> = (args) => <Cta {...args} />;

Secondary.args = {
  theme: ButtonType.Secondary,
  title: 'Learn more'
};
Secondary.argTypes = Default.argTypes;

export const IconOnly: Story<CtaProps> = (args) => (
  <div style={{ background: '#ca877b', padding: '40px' }}>
    <Cta {...args}>
      <ArrowDownSvg />
    </Cta>
  </div>
);

IconOnly.args = {
  isWhite: false,
  theme: ButtonType.Icon
};
