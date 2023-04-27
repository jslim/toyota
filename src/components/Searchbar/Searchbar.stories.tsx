import { Story } from '@storybook/react';

import Searchbar, { SearchbarProps } from './Searchbar';

export default { title: 'components/Searchbar' };

export const Default: Story<SearchbarProps> = (args) => <Searchbar {...args} />;

Default.args = {
  label: 'Search...',
  cleanLabel: 'clean'
};

Default.argTypes = {};
