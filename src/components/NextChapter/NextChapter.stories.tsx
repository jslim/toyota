import { Story } from '@storybook/react';

import { contentfulTestAsset } from '../ContentfulImage/ContentfulImage.stories';
import NextChapter, { NextChapterProps } from './NextChapter';

export default { title: 'components/NextChapter' };

export const Default: Story<NextChapterProps> = (args) => <NextChapter {...args} />;

Default.args = {
  eyebrow: 'Next Chapter',
  link: {
    title: 'Who We Are',
    href: 'https://google.com'
  },
  image: contentfulTestAsset
};

Default.argTypes = {};
