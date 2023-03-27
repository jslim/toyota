import { Story } from '@storybook/react';

import BiographicHero, { BiographicHeroProps } from './BiographicHero';

export default { title: 'components/BiographicHero' };

export const Default: Story<BiographicHeroProps> = (args) => <BiographicHero {...args} />;

Default.args = {};

Default.argTypes = {};
