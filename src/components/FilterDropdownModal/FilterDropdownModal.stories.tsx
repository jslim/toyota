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
        }
      ]
    }
  ]
};

const categoriesTeam = {
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
        }
      ]
    }
  ]
};

const categoriesLocation = {
  header: 'Location',
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

export const Default: Story<FilterDropdownModalProps> = (args) => <FilterDropdownModal {...args} isOpen />;

Default.args = {
  header: 'Filters',
  children: [
    <FilterDropdownModalOptions key={1} {...categoriesType}></FilterDropdownModalOptions>,
    <FilterDropdownModalOptions key={2} {...categoriesLocation}></FilterDropdownModalOptions>,
    <FilterDropdownModalOptions key={3} {...categoriesTeam}></FilterDropdownModalOptions>
  ]
};
