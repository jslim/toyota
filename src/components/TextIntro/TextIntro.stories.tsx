import { Story } from '@storybook/react';

import TextIntro, { TextIntroProps } from './TextIntro';

export default { title: 'components/TextIntro' };

export const Default: Story<TextIntroProps> = (args) => <TextIntro {...args} />;

Default.args = {};

Default.argTypes = {};
