import { Story } from '@storybook/react';

import FilterDropdownModalOptions, { FilterDropdownModalOptionsProps } from './FilterDropdownModalOptions';

export default { title: 'components/FilterDropdownModalOptions' };

export const Default: Story<FilterDropdownModalOptionsProps> = (args) => <FilterDropdownModalOptions {...args} />;

Default.args = {
  header: 'Team',
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
      title: 'Global Operations',
      options: [
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
    },
    {
      title: 'Investment & Acquisitions',
      options: [
        {
          label: 'Tokyo',
          value: 'tokyo'
        },
        {
          label: 'London',
          value: 'london'
        },
        {
          label: 'Montevideo',
          value: 'montevideo'
        },
        {
          label: 'Toronto',
          value: 'toronto'
        }
      ]
    }
  ]
};
