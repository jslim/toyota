import { Story } from '@storybook/react';

import TextIntro, { TextIntroProps } from './TextIntro';
import { TextIntroLayout } from './TextIntro';
export default { title: 'components/TextIntro' };

export const Default: Story<TextIntroProps> = (args) => <TextIntro {...args} />;

Default.args = {
  layout: TextIntroLayout.Default,
  data: {
    eyebrow: 'Our Mission',
    header: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    description:
      'With offices around the world, but with global headquarters in Japan, Woven Planet serves as a bridge between ideas and cultures. It’s a role we take seriously—and are honored to play. We are on constant lookout for talented, committed people from around the world to join our movement.',
    ctaText: 'ALL NEWS',
    subsection: {
      header1: 'Personally Owned Vehicles (POV)',
      description1:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer quis urna sit amet elit gravida sollicitudin vel id nunc. Fusce risus nunc, varius non mi ut, scelerisque maximus nibh. Interdum et ',
      header2: 'MaaS',
      description2:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer quis urna sit amet elit gravida sollicitudin vel id nunc. Fusce risus nunc, varius non mi ut, scelerisque maximus nibh. Interdum et '
    }
  }
};

Default.argTypes = {
  layout: {
    control: {
      type: 'select',
      options: TextIntroLayout
    }
  }
};
