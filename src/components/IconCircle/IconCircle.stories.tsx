import { Story } from '@storybook/react';

import IconCircle, { IconCircleProps } from './IconCircle';

import ArrowDownSvg from '@/components/svgs/svg-arrow-down.svg';

export default { title: 'components/IconCircle' };

export const Default: Story<IconCircleProps> = (args) => (
  <IconCircle {...args}>
    <ArrowDownSvg />
  </IconCircle>
);

Default.args = {};

export const White: Story<IconCircleProps> = (args) => (
  <div style={{ background: '#1E1E1E', padding: '40px' }}>
    <IconCircle {...args}>
      <ArrowDownSvg />
    </IconCircle>
  </div>
);

White.args = {
  isWhite: true
};
