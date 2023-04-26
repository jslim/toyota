import { Story } from '@storybook/react';

import FilterDropdownModalOptions from '../FilterDropdownModalOptions/FilterDropdownModalOptions';
import FilterDropdownModal, { FilterDropdownModalProps } from './FilterDropdownModal';

export default { title: 'components/FilterDropdownModal' };

const categoriesType = {
  header: 'Type',
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
          label: 'Item1',
          value: 'item1'
        },
        {
          label: 'Item2',
          value: 'item2'
        },
        {
          label: 'Item3',
          value: 'item3'
        },
        {
          label: 'Item4',
          value: 'item4'
        },
        {
          label: 'Item5',
          value: 'item5'
        },
        {
          label: 'Item6',
          value: 'item6'
        },
        {
          label: 'Item7',
          value: 'item7'
        },
        {
          label: 'Item8',
          value: 'item8'
        }
      ]
    }
  ]
};

export const Default: Story<FilterDropdownModalProps> = (args) => <FilterDropdownModal {...args} isOpen />;

Default.args = {
  children: [<FilterDropdownModalOptions key={1} {...categoriesType}></FilterDropdownModalOptions>]
};
