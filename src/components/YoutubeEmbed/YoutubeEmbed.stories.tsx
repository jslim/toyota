import { Story } from '@storybook/react';

import YoutubeEmbed, { YoutubeEmbedProps } from './YoutubeEmbed';

export default { title: 'components/YoutubeEmbed' };

export const Default: Story<YoutubeEmbedProps> = (args) => <YoutubeEmbed {...args} />;

Default.args = { embedId: 'o66Ke8thnWM' };

Default.argTypes = {};
