import { Story } from '@storybook/react';

import AssetsDownload, { AssetsProps } from './AssetsDownload';

import { contentfulTestAsset } from '../ContentfulImage/ContentfulImage.stories';

export default { title: 'components/AssetsDownload' };

export const Default: Story<AssetsProps> = (args) => (
  <div style={{ width: '100%' }}>
    <AssetsDownload {...args} />
  </div>
);

Default.args = {
  title: 'article assets',
  assets: [
    contentfulTestAsset,
    contentfulTestAsset,
    contentfulTestAsset,
    contentfulTestAsset,
    contentfulTestAsset,
    contentfulTestAsset,
    contentfulTestAsset,
    contentfulTestAsset
  ]
};

Default.argTypes = {};
