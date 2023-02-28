import { Story } from '@storybook/react';

import Eyebrow, { EyebrowProps } from './Eyebrow';

export default { title: 'components/Eyebrow' };

export const Default: Story<EyebrowProps> = (args) => <Eyebrow {...args} />;

export const DarkVariant: Story<EyebrowProps> = (args) => <Eyebrow {...args} />;

Default.args = {
  text: 'Our Mission'
};

DarkVariant.args = {
  text: 'Our Mission',
  variant: 'dark'
};
