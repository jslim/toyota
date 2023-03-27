import { Story } from '@storybook/react';

import { SocialPlatform } from '@/data/variants';

import SocialIcon, { SocialIconProps } from './SocialIcon';

export default { title: 'components/SocialIcon' };

export const Default: Story<SocialIconProps> = (args) => <SocialIcon {...args} />;

Default.args = {
  platform: SocialPlatform.FACEBOOK,
  href: 'facebook.com',
  label: 'facebook icon',
  isWhite: false
};

Default.argTypes = {};
