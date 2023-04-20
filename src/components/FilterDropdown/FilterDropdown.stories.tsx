import { Story } from '@storybook/react';

import FilterDropdown, { FilterDropdownProps } from './FilterDropdown';

export default { title: 'components/FilterDropdown' };

export const Default: Story<FilterDropdownProps> = (args) => <FilterDropdown {...args} />;

Default.args = {
  title: 'Location',
  alt: 'Filter by Location Location',
  categories: [
    {
      options: [
        {
          label: 'All',
          value: 'all'
        }
      ]
    },
    {
      options: [
        {
          label: 'Tokyo',
          value: 'tokyo'
        },
        {
          label: 'London',
          value: 'london'
        }
      ]
    }
  ]
};
