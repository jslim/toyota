import { Story } from '@storybook/react';

import BiographyText, { BiographyTextProps } from './BiographyText';

export default { title: 'components/BiographyText' };

export const Default: Story<BiographyTextProps> = (args) => <BiographyText {...args} />;

Default.args = {};

Default.argTypes = {};
