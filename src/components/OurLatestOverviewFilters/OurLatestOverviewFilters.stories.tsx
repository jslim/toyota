import { Story } from '@storybook/react';

import OurLatestOverviewFilters, { OurLatestOverviewFiltersProps } from './OurLatestOverviewFilters';

export default { title: 'components/OurLatestOverviewFilters' };

export const Default: Story<OurLatestOverviewFiltersProps> = (args) => <OurLatestOverviewFilters {...args} />;

Default.args = {
  categoryTitle: 'Categories',
  categoryQuery: 'category',
  topicTitle: 'Topics',
  topicQuery: 'topic',
  totalCards: 10,
  filtersLabel: 'Filters',
  allLabel: 'All',
  categories: [
    {
      title: 'News',
      category: 'category'
    },
    {
      title: 'Blog',
      category: 'category'
    }
  ],
  topics: [
    {
      title: 'Arene',
      category: 'topic'
    },
    {
      title: 'Woven',
      category: 'topic'
    }
  ]
};

Default.argTypes = {};
