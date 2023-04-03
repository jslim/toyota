import { Story } from '@storybook/react';

import FeaturesList, { FeaturesListProps } from './FeaturesList';

export default { title: 'components/FeaturesList' };

export const Default: Story<FeaturesListProps> = (args) => (
  <div style={{ padding: '600px 0', width: '100%' }}>
    <FeaturesList {...args} />
  </div>
);

Default.args = {
  eyebrow: 'what’s new',
  title: 'Features headline goes here.',
  items: [
    {
      title: 'Vehicle Platform',
      text: 'Lorem ipsum dolor sit amets, consectetur adipiscing elit. Integer quis urna sit amet elit gravida sollicitudin vel id nunc. Fusce risus nunc, varius non mi ut, scelerisque maximus nibh. Interdum et malesuada fames ac ante ipsum primis in.'
    },
    {
      title: 'Electronic Control Units',
      text: 'Lorem ipsum dolor sit ametww, consectetur adipiscing elit. Integer quis urna sit amet elit gravida sollicitudin vel id nunc. Fusce risus nunc, varius non mi ut, scelerisque maximus nibh. Interdum et malesuada fames ac ante ipsum primis in.'
    },
    {
      title: 'Vehicle Platform',
      text: 'Lorem ipsum dolor sit ametf, consectetur adipiscing elit. Integer quis urna sit amet elit gravida sollicitudin vel id nunc. Fusce risus nunc, varius non mi ut, scelerisque maximus nibh. Interdum et malesuada fames ac ante ipsum primis in.'
    },
    {
      title: 'Electronic Control Units',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer quis urna sit amet elit gravida sollicitudin vel id nunc. Fusce risus nunc, varius non mi ut, scelerisque maximus nibh. Interdum et malesuada fames ac ante ipsum primis in.'
    }
  ]
};

Default.argTypes = {};
