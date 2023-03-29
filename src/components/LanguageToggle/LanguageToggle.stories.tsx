import { Story } from '@storybook/react';

import LanguageToggle, { LanguageToggleProps } from './LanguageToggle';

export default { title: 'components/LanguageToggle' };

export const Default: Story<LanguageToggleProps> = (args) => <LanguageToggle {...args} />;

Default.args = {};

Default.argTypes = {};
