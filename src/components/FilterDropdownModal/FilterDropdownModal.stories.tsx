import { Story } from '@storybook/react';

import FilterDropdownModalOptions from '../FilterDropdownModalOptions/FilterDropdownModalOptions';
import FilterDropdownModal, { FilterDropdownModalProps } from './FilterDropdownModal';

export default { title: 'components/FilterDropdownModal' };

const categoriesType = {
  header: 'Type',
  category: 'type',
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
          label: 'Item1'
        },
        {
          label: 'Item2'
        },
        {
          label: 'Item3'
        },
        {
          label: 'Item4'
        },
        {
          label: 'Item5'
        },
        {
          label: 'Item6'
        },
        {
          label: 'Item7'
        },
        {
          label: 'Item8'
        }
      ]
    }
  ]
};

export const Default: Story<FilterDropdownModalProps> = (args) => <FilterDropdownModal {...args} isOpen />;

Default.args = {
  children: [<FilterDropdownModalOptions key={1} {...categoriesType}></FilterDropdownModalOptions>]
};
