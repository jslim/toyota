import { Story } from '@storybook/react';

import SocialIcon, { SocialIconProps } from './SocialIcon';

export default { title: 'components/SocialIcon' };

export const Default: Story<SocialIconProps> = (args) => <SocialIcon {...args} />;

Default.args = {
  platform: 'facebook',
  href: 'facebook.com',
  label: 'facebook icon',
  isWhite: false
};

Default.argTypes = {};
