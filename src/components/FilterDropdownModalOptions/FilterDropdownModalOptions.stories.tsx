import { Story } from '@storybook/react';

import FilterDropdownModalOptions, { FilterDropdownModalOptionsProps } from './FilterDropdownModalOptions';

export default { title: 'components/FilterDropdownModalOptions' };

export const Default: Story<FilterDropdownModalOptionsProps> = (args) => <FilterDropdownModalOptions {...args} />;

Default.args = {
  header: 'Team',
  content: [
    {
      options: [
        {
          label: 'All'
        }
      ]
    },
    {
      title: 'Global Operations',
      options: [
        {
          label: 'On-site'
        },
        {
          label: 'Hybrid'
        },
        {
          label: 'Remote'
        }
      ]
    },
    {
      title: 'Investment & Acquisitions',
      options: [
        {
          label: 'Tokyo'
        },
        {
          label: 'London'
        },
        {
          label: 'Montevideo'
        },
        {
          label: 'Toronto'
        }
      ]
    }
  ]
};
