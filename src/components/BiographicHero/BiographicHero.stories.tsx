import { Story } from '@storybook/react';

import BiographicHero, { BiographicHeroProps } from './BiographicHero';

export default { title: 'components/BiographicHero' };

export const Default: Story<BiographicHeroProps> = (args) => <BiographicHero {...args} />;

Default.args = {
  title: 'Dr. James Kuffner',
  description: `Chief Executive Officer
  Woven Planet Holdings & 
  Executive Advisor, TRI`
};

Default.argTypes = {};
