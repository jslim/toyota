import { Story } from '@storybook/react';

import FilterDropdownModalOptions from '../FilterDropdownModalOptions/FilterDropdownModalOptions';
import FilterList, { FilterListProps } from './FilterList';

export default { title: 'components/FilterList' };

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
  category: 'team',
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
        }
      ]
    }
  ]
};

const categoriesLocation = {
  header: 'Location',
  category: 'location',
  content: [
    {
      options: [
        {
          label: 'All'
        }
      ]
    },
    {
      options: [
        {
          label: 'Tokyo'
        },
        {
          label: 'London'
        }
      ]
    }
  ]
};

export const Default: Story<FilterListProps> = (args) => <FilterList {...args} />;

Default.args = {
  header: 'Filters',
  children: [
    <FilterDropdownModalOptions key={1} {...categoriesType}></FilterDropdownModalOptions>,
    <FilterDropdownModalOptions key={2} {...categoriesLocation}></FilterDropdownModalOptions>,
    <FilterDropdownModalOptions key={3} {...categoriesTeam}></FilterDropdownModalOptions>
  ]
};

Default.argTypes = {};
