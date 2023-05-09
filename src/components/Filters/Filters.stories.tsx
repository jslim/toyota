import { Story } from '@storybook/react';

import Filters, { FiltersProps } from './Filters';

export default { title: 'components/Filters' };

export const Default: Story<FiltersProps> = (args) => <Filters {...args} />;

Default.args = {
  filtersLabel: 'Filters',
  cleanLabel: 'clean',
  searchLabel: 'Search',
  dropdowns: [
    {
      title: 'Location',
      alt: 'Filter by Location Location',
      content: [
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
    }
  ]
};

Default.argTypes = {};
