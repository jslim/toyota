import { Story } from '@storybook/react';

import MediaKit, { MediaKitProps } from './MediaKit';

export default { title: 'components/MediaKit' };

export const Default: Story<MediaKitProps> = (args) => <MediaKit {...args} />;

Default.args = {};

Default.argTypes = {};
