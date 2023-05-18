import { Story } from '@storybook/react';

import OurLatestOverviewGrid, { OurLatestOverviewGridProps } from './OurLatestOverviewGrid';

export default { title: 'components/OurLatestOverviewGrid' };

export const Default: Story<OurLatestOverviewGridProps> = (args) => <OurLatestOverviewGrid {...args} />;

Default.args = {
  topicsLabel: 'Topics',
  categoriesLabel: 'Categories',
  sectionTitle: 'All Updates',
  filtersLabel: 'Filters',
  allLabel: 'All',
  newsLabel: 'News',
  blogLabel: 'Blog',
  researchLabel: 'Research'
};

Default.argTypes = {};
