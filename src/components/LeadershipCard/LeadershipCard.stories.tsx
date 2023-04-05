import { Story } from '@storybook/react';

import { contentfulTestAsset } from '../ContentfulImage/ContentfulImage.stories';
import LeadershipCard, { LeadershipCardProps } from './LeadershipCard';

export default { title: 'components/LeadershipCard' };

export const Default: Story<LeadershipCardProps> = (args) => <LeadershipCard {...args} />;

Default.args = {
  title: 'Name Person',
  description: 'Job title goes here.',
  image: contentfulTestAsset,
  cta: {
    title: 'sss',
    href: 'https://google.com'
  }
};

Default.argTypes = {};
