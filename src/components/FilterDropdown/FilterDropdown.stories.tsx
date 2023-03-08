import { Story } from '@storybook/react';

import FilterDropdown, { FilterDropdownProps } from './FilterDropdown';

export default { title: 'components/FilterDropdown' };

export const Default: Story<FilterDropdownProps> = (args) => <FilterDropdown {...args} />;

Default.args = {
  title: 'Type',
  options: [
    {
      label: 'All',
      value: 'all'
    },
    {
      label: 'On-site',
      value: 'on-site'
    },
    {
      label: 'Hybrid',
      value: 'hybrid'
    },
    {
      label: 'Remote',
      value: 'remote'
    }
  ]
};

Default.argTypes = {};
