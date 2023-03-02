import { Story } from '@storybook/react';

import NextChapter, { NextChapterProps } from './NextChapter';

export default { title: 'components/NextChapter' };

export const Default: Story<NextChapterProps> = (args) => <NextChapter {...args} />;

Default.args = {
  // eyebrow: string;
  link: {
    title: 'Who We Are',
    href: 'https://google.com'
  },
  image: {
    src: 'https://i1.wp.com/thetalkinggeek.com/wp-content/uploads/2015/09/sintel1.png?fit=1920%2C817&ssl=1',
    alt: ''
  }
};

Default.argTypes = {};
