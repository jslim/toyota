import { Story } from '@storybook/react';

import ListItem, { ListItemProps } from './ListItem';

export default { title: 'components/ListItem' };

export const Default: Story<ListItemProps> = (args) => <ListItem {...args} />;

Default.args = {};

Default.argTypes = {};
