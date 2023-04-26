import { Story } from '@storybook/react';

import CareersList, { CareersListProps } from './CareersList';

export default { title: 'components/CareersList' };

export const Default: Story<CareersListProps> = (args) => <CareersList {...args} />;

Default.args = {
  title: 'Lorem ipsum dolor sit',
  eyebrow: 'careers'
};

Default.argTypes = {};
