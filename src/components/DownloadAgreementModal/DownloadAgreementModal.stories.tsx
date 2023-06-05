import { Story } from '@storybook/react';

import DownloadAgreementModal, { DownloadAgreementModalProps } from './DownloadAgreementModal';

export default { title: 'components/DownloadAgreementModal' };

export const Default: Story<DownloadAgreementModalProps> = (args) => <DownloadAgreementModal {...args} />;

Default.args = {
  onClose: () => console.log('close')
};

Default.argTypes = {};
