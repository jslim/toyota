import { Story } from '@storybook/react';

import Cursor, { CursorProps } from './Cursor';

export default { title: 'components/Cursor' };

export const Default: Story<CursorProps> = (args) => <Cursor {...args} />;

Default.args = {};

Default.argTypes = {};
